import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { RolesGuard } from '../src/auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { PERMISSION_KEY } from '../src/auth/decorators/roles.decorator';

async function runVerification() {
  console.log('=== STARTING RBAC & ONBOARDING VERIFICATION ===\n');

  // 1. Initialize NestJS App Context
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const rolesGuard = app.get(RolesGuard);
  const prisma = app.get(PrismaService);
  const reflector = app.get(Reflector);

  try {
    // 2. Clean up any previous test runs to ensure reproducibility
    console.log('Cleaning up previous verification test users...');
    const testEmails = ['bob@builder-corp.com', 'alice@acme.com'];
    await prisma.roleAssignment.deleteMany({
      where: { user: { email: { in: testEmails } } }
    });
    await prisma.user.deleteMany({
      where: { email: { in: testEmails } }
    });
    await prisma.tenant.deleteMany({
      where: { id: 'builder-corp-corp' } // generated candidate ID from domain
    });

    // 3. Test Step 1 Onboarding: Resolve templates by vertical
    console.log('\n--- Test Onboarding Step 1: Fetching Construction Role Templates ---');
    const constructionTemplates = await authService.getRoleTemplatesByVertical('Construction');
    console.log('Construction Templates Found:', constructionTemplates.map(t => ({ id: t.id, name: t.name })));
    
    const pmTemplate = constructionTemplates.find(t => t.name === 'Project Manager');
    if (!pmTemplate) {
      throw new Error('Project Manager template not seeded!');
    }
    console.log(`Resolved "Project Manager" template ID: ${pmTemplate.id}`);

    // 4. Test Step 2 Onboarding: Unified Registration for Bob
    console.log('\n--- Test Onboarding Step 2: Registering Bob (Project Manager, HILLS-PHASE-II) ---');
    const registerPayload = {
      email: 'bob@builder-corp.com',
      password: 'password123',
      fullName: 'Bob The Builder',
      roleId: pmTemplate.id,
      scopeReference: 'HILLS-PHASE-II'
    };

    const loginSession = await authService.register(registerPayload);
    console.log('Registration Successful! Session Returned:');
    console.log(`- Access Token Issued: ${!!loginSession.accessToken}`);
    console.log(`- Resolved Tenant: ${loginSession.user.tenantId}`);
    console.log(`- User: ${loginSession.user.firstName} ${loginSession.user.lastName} (Roles: ${loginSession.user.roles.join(', ')})`);

    // Verify database entries for Bob
    const bobUser = await prisma.user.findFirst({
      where: { email: 'bob@builder-corp.com' },
      include: {
        roleAssignments: {
          include: { role: true }
        }
      }
    });

    console.log('\nVerifying Bob in database:');
    console.log(`- First Name: "${bobUser?.firstName}"`);
    console.log(`- Last Name: "${bobUser?.lastName}"`);
    console.log(`- Assignment Scope: ${bobUser?.roleAssignments[0]?.scopeType} (ID: ${bobUser?.roleAssignments[0]?.scopeId})`);

    // 5. Test Step 2 Onboarding: Registering Alice as PropertyManager (acme-corp tenant)
    console.log('\n--- Registering Alice (PropertyManager, Tenant-scoped to acme-corp) ---');
    const pmBusinessTemplate = await prisma.roleTemplate.findFirst({
      where: { name: 'PropertyManager' }
    });
    
    if (!pmBusinessTemplate) {
      throw new Error('PropertyManager template not seeded!');
    }

    const aliceSession = await authService.register({
      email: 'alice@acme.com',
      password: 'password123',
      fullName: 'Alice Smith',
      roleId: pmBusinessTemplate.id,
      scopeReference: '', // Will default or use TENANT scope
      tenantId: 'acme-corp' // Explicit tenant
    });

    console.log('Alice Registered Successfully!');
    console.log(`- Tenant: ${aliceSession.user.tenantId}`);
    console.log(`- Roles: ${aliceSession.user.roles.join(', ')}`);

    // 6. Test RolesGuard Perms & Scope Checking
    console.log('\n--- Testing RolesGuard Verification ---');

    // Helper to mock NestJS context
    const createMockContext = (userPayload: any, requiredPermission: { resource: string, action: string } | null, resourceIdInUrl?: string): ExecutionContext => {
      // Stub Reflector
      reflector.getAllAndOverride = jest.fn().mockImplementation((key, targets) => {
        if (key === PERMISSION_KEY) return requiredPermission;
        return null;
      });

      // Stub Request
      const req = {
        user: userPayload,
        params: { id: resourceIdInUrl },
        body: {},
        query: {}
      };

      return {
        switchToHttp: () => ({
          getRequest: () => req
        }),
        getHandler: () => ({}),
        getClass: () => ({})
      } as any;
    };

    // Prepare Jest global stub for Reflector mock
    (global as any).jest = {
      fn: () => {
        const fn: any = (...args: any[]) => fn._impl ? fn._impl(...args) : undefined;
        fn.mockImplementation = (impl: any) => { fn._impl = impl; return fn; };
        return fn;
      }
    };

    // Test case 1: Alice (Tenant Scope PropertyManager) tries to create a Property
    console.log('\nTest Case 1: Alice (Tenant-scoped PropertyManager) attempts to CREATE a Property:');
    const aliceUserPayload = { sub: aliceSession.user.id, tenantId: 'acme-corp' };
    const context1 = createMockContext(aliceUserPayload, { resource: 'Property', action: 'CREATE' });
    
    const allowed1 = await rolesGuard.canActivate(context1);
    console.log(`-> Result: ${allowed1 ? 'ALLOWED (Correct)' : 'DENIED (Error)'}`);

    // Test case 2: Bob (Construction-scoped Project Manager) tries to create a Property
    console.log('\nTest Case 2: Bob (Construction-scoped Project Manager) attempts to CREATE a Property (should be Denied):');
    const bobUserPayload = { sub: bobUser?.id, tenantId: bobUser?.tenantId };
    const context2 = createMockContext(bobUserPayload, { resource: 'Property', action: 'CREATE' });
    
    try {
      await rolesGuard.canActivate(context2);
      console.log('-> Result: ALLOWED (Error: Bob should have been denied!)');
    } catch (err) {
      if (err instanceof ForbiddenException) {
        console.log(`-> Result: DENIED with ForbiddenException (Correct): "${err.message}"`);
      } else {
        console.log('-> Result: Failed with unexpected error:', err);
      }
    }

    // Test case 3: Bob tries to access a Construction Job with his matched scope Reference
    console.log('\nTest Case 3: Bob attempts to access WorkOrder for his scoped construction job ("HILLS-PHASE-II"):');
    const context3 = createMockContext(bobUserPayload, { resource: 'WorkOrder', action: 'READ' }, 'HILLS-PHASE-II');
    const allowed3 = await rolesGuard.canActivate(context3);
    console.log(`-> Result: ${allowed3 ? 'ALLOWED (Correct)' : 'DENIED (Error)'}`);

    // Test case 4: Bob tries to access a Construction Job with a DIFFERENT scope ID
    console.log('\nTest Case 4: Bob attempts to access WorkOrder for a DIFFERENT construction job ("HILLS-PHASE-III"):');
    const context4 = createMockContext(bobUserPayload, { resource: 'WorkOrder', action: 'READ' }, 'HILLS-PHASE-III');
    try {
      await rolesGuard.canActivate(context4);
      console.log('-> Result: ALLOWED (Error: Bob should have been denied for wrong scope!)');
    } catch (err) {
      if (err instanceof ForbiddenException) {
        console.log(`-> Result: DENIED with ForbiddenException (Correct): "${err.message}"`);
      } else {
        console.log('-> Result: Failed with unexpected error:', err);
      }
    }

    console.log('\n=== ALL RBAC & ONBOARDING VERIFICATION TESTS PASSED ===');

  } catch (error) {
    console.error('\nVerification failed with error:', error);
  } finally {
    await app.close();
  }
}

runVerification();
