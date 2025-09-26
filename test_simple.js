// Simple test script
const API_BASE = 'http://localhost:5000/api/simple';

async function testSimpleAPI() {
  console.log('🧪 Testing Simple API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);

    // Test simple inventory
    console.log('\n2. Testing simple inventory...');
    const inventoryResponse = await fetch(`${API_BASE}/`);
    const inventoryData = await inventoryResponse.json();
    console.log('✅ Inventory count:', inventoryData.data?.length || 0);

    // Test dealer inventory
    console.log('\n3. Testing dealer inventory...');
    const dealerResponse = await fetch(`${API_BASE}/dealer/1`);
    const dealerData = await dealerResponse.json();
    console.log('✅ Dealer inventory count:', dealerData.data?.length || 0);

    // Test adding a car
    console.log('\n4. Testing add car...');
    const addResponse = await fetch(`${API_BASE}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dealer_id: 1,
        title: 'Test Car - API Working',
        price: 500000,
        image_url: 'https://via.placeholder.com/400x300?text=Test+Car',
        description: '• Test car\n• API is working\n• Database connected\n• Ready to use\n• Success!',
        color: 'Blue',
        actual_mileage: 20.0,
        year_of_manufacture: 2020
      })
    });
    
    const addData = await addResponse.json();
    if (addResponse.ok) {
      console.log('✅ Car added successfully! ID:', addData.data?.id);
    } else {
      console.log('❌ Failed to add car:', addData.message);
    }

    console.log('\n🎉 Simple API test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure your database is set up with setup_database_simple.sql');
    console.log('2. Restart your backend server');
    console.log('3. Try adding a car in the frontend - it should work now!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the backend server is running on port 5000');
    console.log('2. Check if the database is properly set up');
    console.log('3. Run: mysql -u root -p < setup_database_simple.sql');
  }
}

// Run the test
testSimpleAPI();
