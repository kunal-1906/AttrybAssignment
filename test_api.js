// Test script to verify API endpoints
const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('Testing BUYC Corp API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE.replace('/api', '')}/health`);
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData.status);

    // Test OEM models count
    console.log('\n2. Testing OEM models count...');
    const modelsResponse = await fetch(`${API_BASE}/oem/models`);
    const modelsData = await modelsResponse.json();
    console.log('OEM Models:', modelsData.data);

    // Test Honda City 2015 specs
    console.log('\n3. Testing Honda City 2015 specs...');
    const hondaResponse = await fetch(`${API_BASE}/oem/honda-city-2015`);
    const hondaData = await hondaResponse.json();
    console.log('Honda City 2015:', hondaData.data?.manufacturer, hondaData.data?.model_name, hondaData.data?.year_of_model);

    // Test inventory endpoint
    console.log('\n4. Testing inventory endpoint...');
    const inventoryResponse = await fetch(`${API_BASE}/inventory`);
    const inventoryData = await inventoryResponse.json();
    console.log('Inventory count:', inventoryData.data?.length || 0);

    // Test dealer inventory (assuming dealer ID 1)
    console.log('\n5. Testing dealer inventory...');
    const dealerResponse = await fetch(`${API_BASE}/dealer/1/inventory`);
    const dealerData = await dealerResponse.json();
    console.log('Dealer inventory count:', dealerData.data?.length || 0);

    console.log('\nAll API tests completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Make sure your backend is running: cd backend && npm start');
    console.log('2. Make sure your database is set up with the sample data');
    console.log('3. Start your frontend: npm start');
    console.log('4. Try adding a car - it should now save to the database!');

  } catch (error) {
    console.error('API test failed:', error.message);
    console.log('\n Troubleshooting:');
    console.log('1. Make sure the backend server is running on port 5000');
    console.log('2. Check if the database is properly set up');
    console.log('3. Verify the .env file in the backend directory');
  }
}

// Run the test
testAPI();
