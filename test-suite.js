const baseUrl = 'http://localhost:3001/api/v1';

async function runTest(name, url, method, body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    };
    const res = await fetch(`${baseUrl}${url}`, options);
    const data = await res.json().catch(() => null);
    
    if (res.ok) {
      console.log(`✅ [SUCCESS] ${name} (${method} ${url})`);
      return { success: true, data };
    } else {
      console.log(`❌ [FAILED]  ${name} (${method} ${url})`);
      console.log(`   Status: ${res.status}`);
      console.log(`   Response:`, data);
      return { success: false, data };
    }
  } catch (error) {
    console.log(`💥 [ERROR]   ${name} (${method} ${url})`);
    console.log(`   Exception:`, error.message);
    return { success: false, error };
  }
}

async function runAll() {
  console.log("=== STARTING PROPERTY MODULE INTEGRATION TEST SUITE ===");

  // 1. Create Property
  const propRes = await runTest('Create Property', '/properties', 'POST', {
    name: 'QA Test Property',
    type: 'Commercial',
    address: '123 QA St',
    city: 'QA City',
    state: 'QA State',
    zipCode: '12345'
  });
  const propId = propRes.data?.id;

  if (!propId) {
    console.error("Cannot proceed without a property ID");
    return;
  }

  // 2. Edit Property
  await runTest('Edit Property', `/properties/${propId}`, 'PATCH', {
    name: 'QA Test Property Edited',
    type: 'Residential'
  });

  // 3. Clone Property
  await runTest('Clone Property', `/properties/${propId}/clone`, 'POST');

  // 4. Create Tower
  const towerRes = await runTest('Create Tower', '/buildings', 'POST', {
    name: 'QA Test Tower',
    projectId: propId
  });
  const towerId = towerRes.data?.id;

  if (towerId) {
    // Edit Tower
    await runTest('Edit Tower', `/buildings/${towerId}`, 'PATCH', {
      name: 'QA Test Tower Edited'
    });

    // 5. Create Floor
    const floorRes = await runTest('Create Floor', '/floors', 'POST', {
      name: 'QA Test Floor',
      towerId: towerId
    });
    const floorId = floorRes.data?.id;

    if (floorId) {
      // 6. Create Unit
      const unitRes = await runTest('Create Unit', '/units', 'POST', {
        unitNumber: 'QA-101',
        unitType: 'COMMERCIAL_OFFICE',
        areaSqFt: 1500,
        floorId: floorId
      });
      const unitId = unitRes.data?.id;

      // 7. Archive Unit
      if (unitId) {
        await runTest('Archive Unit', `/units/${unitId}/archive`, 'POST');
      }

      // 8. Archive Floor
      await runTest('Archive Floor', `/floors/${floorId}/archive`, 'POST');
    }

    // 9. Archive Tower
    await runTest('Archive Tower', `/buildings/${towerId}/archive`, 'POST');
  }

  // 10. Archive Property
  await runTest('Archive Property', `/properties/${propId}/archive`, 'POST');

  console.log("=== END OF TEST SUITE ===");
}

runAll();
