const test = async () => {
  const loginRes = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@propertyhub.com', password: 'password', tenantId: 'tenant-1' })
  });
  const loginData = await loginRes.json();
  console.log('Login Status:', loginRes.status);
  console.log('Login Response:', loginData);
  
  if (!loginData.accessToken) return;

  const res = await fetch('http://localhost:3001/api/v1/properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginData.accessToken}`
    },
    body: JSON.stringify({
      name: 'Test Property',
      type: 'COMMERCIAL',
      address: '123 Main St',
      city: 'NY',
      state: 'NY',
      zipCode: '10001'
    })
  });
  const text = await res.text();
  console.log('Create Property Status:', res.status);
  console.log('Create Property Response:', text);
};
test();
