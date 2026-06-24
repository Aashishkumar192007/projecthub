import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface RequestWithTenant extends Request {
  tenantId?: string;
  user?: any;
}

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: RequestWithTenant, res: Response, next: NextFunction) {
    // Extract tenant ID from header for API calls, or from decoded JWT user object
    const tenantIdHeader = req.headers['x-tenant-id'] as string;
    
    // In a real production environment with auth guards, 
    // the tenant ID will often be validated against the JWT.
    if (tenantIdHeader) {
      req.tenantId = tenantIdHeader;
    }

    // Example strict enforcement for specific routes:
    // if (!req.tenantId && !req.path.includes('/auth/login')) {
    //   throw new ForbiddenException('Tenant ID is required for this action');
    // }

    next();
  }
}
