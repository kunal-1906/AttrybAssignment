// Test script to verify database setup
const mysql = require('mysql2/promise');

async function testDatabase() {
  console.log('🧪 Testing Database Setup...\n');

  try {
    // Connect to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Update with your password
      database: 'buyc_marketplace'
    });

    console.log('✅ Database connected successfully');

    // Test OEM_Specs table
    const [oemRows] = await connection.execute('SELECT COUNT(*) as count FROM OEM_Specs');
    console.log(`✅ OEM_Specs table: ${oemRows[0].count} records`);

    // Test Marketplace_Inventory table
    const [inventoryRows] = await connection.execute('SELECT COUNT(*) as count FROM Marketplace_Inventory');
    console.log(`✅ Marketplace_Inventory table: ${inventoryRows[0].count} records`);

    // Test Dealers table
    const [dealerRows] = await connection.execute('SELECT COUNT(*) as count FROM Dealers');
    console.log(`✅ Dealers table: ${dealerRows[0].count} records`);

    // Test a sample query
    const [sampleCars] = await connection.execute(`
      SELECT mi.id, mi.title, mi.price, d.name as dealer_name
      FROM Marketplace_Inventory mi
      LEFT JOIN Dealers d ON mi.dealer_id = d.id
      LIMIT 3
    `);

    console.log('\n📋 Sample cars in database:');
    sampleCars.forEach(car => {
      console.log(`  - ${car.title} (₹${car.price}) - ${car.dealer_name}`);
    });

    await connection.end();
    console.log('\n🎉 Database test completed successfully!');

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check your database credentials');
    console.log('3. Run the database setup scripts:');
    console.log('   - database/schema.sql');
    console.log('   - database/seed_data.sql');
  }
}

// Run the test
testDatabase();
