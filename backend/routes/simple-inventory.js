const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Simple inventory route that works without complex joins
router.get('/', async (req, res) => {
  try {
    console.log('Fetching inventory...');
    
    // Simple query with dealer join for name and odometer
    const [rows] = await pool.execute(`
      SELECT 
        mi.id,
        mi.title,
        mi.price,
        mi.image_url,
        mi.description,
        mi.color,
        mi.actual_mileage,
        mi.year_of_manufacture,
        mi.km_on_odometer,
        mi.dealer_id,
        d.name AS dealer_name,
        mi.created_at
      FROM Marketplace_Inventory mi
      LEFT JOIN Dealers d ON mi.dealer_id = d.id
      WHERE mi.status = 'active'
      ORDER BY mi.created_at DESC
      LIMIT 50
    `);
    
    console.log(`Found ${rows.length} cars in database`);
    
    res.json({
      success: true,
      data: rows,
      message: 'Inventory retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inventory',
      message: error.message
    });
  }
});

// Simple dealer inventory route
router.get('/dealer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching inventory for dealer ${id}...`);
    
    const [rows] = await pool.execute(`
      SELECT 
        mi.id,
        mi.title,
        mi.price,
        mi.image_url,
        mi.description,
        mi.color,
        mi.actual_mileage,
        mi.year_of_manufacture,
        mi.km_on_odometer,
        mi.dealer_id,
        d.name AS dealer_name,
        mi.created_at
      FROM Marketplace_Inventory mi
      LEFT JOIN Dealers d ON mi.dealer_id = d.id
      WHERE mi.dealer_id = ? AND mi.status = 'active'
      ORDER BY mi.created_at DESC
    `, [parseInt(id)]);
    
    console.log(`Found ${rows.length} cars for dealer ${id}`);
    
    res.json({
      success: true,
      data: rows,
      message: 'Dealer inventory retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching dealer inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dealer inventory',
      message: error.message
    });
  }
});

// Simple add car route
router.post('/add', async (req, res) => {
  try {
    const {
      dealer_id,
      title,
      price,
      image_url,
      description,
      color,
      actual_mileage,
      year_of_manufacture,
      km_on_odometer
    } = req.body;
    
    console.log('Adding car:', { dealer_id, title, price });
    
    const [result] = await pool.execute(`
      INSERT INTO Marketplace_Inventory (
        dealer_id, title, price, image_url, description, 
        color, actual_mileage, year_of_manufacture, km_on_odometer, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `, [
      parseInt(dealer_id),
      title,
      parseFloat(price),
      image_url,
      description,
      color || null,
      actual_mileage ? parseFloat(actual_mileage) : null,
      year_of_manufacture ? parseInt(year_of_manufacture) : null,
      km_on_odometer ? parseInt(km_on_odometer) : null
    ]);
    
    console.log('Car added with ID:', result.insertId);
    
    res.status(201).json({
      success: true,
      data: { id: result.insertId },
      message: 'Car added successfully'
    });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add car',
      message: error.message
    });
  }
});

module.exports = router;
