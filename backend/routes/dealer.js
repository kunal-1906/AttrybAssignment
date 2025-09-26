const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/dealer/:id/inventory - Get dealer's inventory
router.get('/:id/inventory', async (req, res) => {
  try {
    const { id } = req.params;
    const { status = 'active', limit = 50, offset = 0 } = req.query;
    
    const [rows] = await pool.execute(`
      SELECT 
        mi.id,
        mi.title,
        mi.price,
        mi.image_url,
        mi.description,
        mi.km_on_odometer,
        mi.major_scratches,
        mi.original_paint,
        mi.number_of_accidents,
        mi.number_of_previous_buyers,
        mi.registration_place,
        mi.color,
        mi.actual_mileage,
        mi.power_bhp,
        mi.max_speed_kmph,
        mi.year_of_manufacture,
        mi.status,
        mi.created_at,
        mi.updated_at,
        os.manufacturer as oem_manufacturer,
        os.model_name as oem_model,
        os.year_of_model as oem_year
      FROM Marketplace_Inventory mi
      LEFT JOIN OEM_Specs os ON mi.oem_spec_id = os.id
      WHERE mi.dealer_id = ? AND mi.status = ?
      ORDER BY mi.created_at DESC
      LIMIT ? OFFSET ?
    `, [parseInt(id), status, parseInt(limit), parseInt(offset)]);
    
    // Get total count
    const [countResult] = await pool.execute(`
      SELECT COUNT(*) as total
      FROM Marketplace_Inventory
      WHERE dealer_id = ? AND status = ?
    `, [parseInt(id), status]);
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        total: countResult[0].total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < countResult[0].total
      },
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

// POST /api/dealer/:id/inventory - Add new car to dealer's inventory
router.post('/:id/inventory', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      price,
      image_url,
      description,
      km_on_odometer,
      major_scratches = false,
      original_paint = true,
      number_of_accidents = 0,
      number_of_previous_buyers = 0,
      registration_place,
      color,
      actual_mileage,
      power_bhp,
      max_speed_kmph,
      year_of_manufacture,
      oem_spec_id
    } = req.body;
    
    // Validate required fields
    if (!title || !price || !image_url || !description) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Title, price, image_url, and description are required'
      });
    }
    
    const [result] = await pool.execute(`
      INSERT INTO Marketplace_Inventory (
        dealer_id, oem_spec_id, title, price, image_url, description,
        km_on_odometer, major_scratches, original_paint, number_of_accidents,
        number_of_previous_buyers, registration_place, color, actual_mileage,
        power_bhp, max_speed_kmph, year_of_manufacture, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `, [
      parseInt(id), oem_spec_id, title, price, image_url, description,
      km_on_odometer, major_scratches, original_paint, number_of_accidents,
      number_of_previous_buyers, registration_place, color, actual_mileage,
      power_bhp, max_speed_kmph, year_of_manufacture
    ]);
    
    res.status(201).json({
      success: true,
      data: { id: result.insertId },
      message: 'Car added to inventory successfully'
    });
  } catch (error) {
    console.error('Error adding car to inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add car to inventory',
      message: error.message
    });
  }
});

// PUT /api/dealer/inventory/:carId - Update car in inventory
router.put('/inventory/:carId', async (req, res) => {
  try {
    const { carId } = req.params;
    const updateData = req.body;
    
    // Build dynamic update query
    const allowedFields = [
      'title', 'price', 'image_url', 'description', 'km_on_odometer',
      'major_scratches', 'original_paint', 'number_of_accidents',
      'number_of_previous_buyers', 'registration_place', 'color',
      'actual_mileage', 'power_bhp', 'max_speed_kmph', 'year_of_manufacture',
      'oem_spec_id', 'status'
    ];
    
    const updateFields = [];
    const updateValues = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update',
        message: 'Please provide valid fields to update'
      });
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(parseInt(carId));
    
    const [result] = await pool.execute(`
      UPDATE Marketplace_Inventory 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `, updateValues);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Car not found',
        message: `No car found with ID ${carId}`
      });
    }
    
    res.json({
      success: true,
      message: 'Car updated successfully'
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update car',
      message: error.message
    });
  }
});

// DELETE /api/dealer/inventory/:carId - Delete car from inventory
router.delete('/inventory/:carId', async (req, res) => {
  try {
    const { carId } = req.params;
    
    const [result] = await pool.execute(`
      DELETE FROM Marketplace_Inventory WHERE id = ?
    `, [parseInt(carId)]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Car not found',
        message: `No car found with ID ${carId}`
      });
    }
    
    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete car',
      message: error.message
    });
  }
});

// GET /api/dealer/:id/stats - Get dealer statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_cars,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_cars,
        COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold_cars,
        AVG(price) as avg_price,
        MIN(price) as min_price,
        MAX(price) as max_price,
        SUM(price) as total_value
      FROM Marketplace_Inventory
      WHERE dealer_id = ?
    `, [parseInt(id)]);
    
    const [recentCars] = await pool.execute(`
      SELECT COUNT(*) as recent_cars
      FROM Marketplace_Inventory
      WHERE dealer_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `, [parseInt(id)]);
    
    res.json({
      success: true,
      data: {
        ...stats[0],
        recent_cars: recentCars[0].recent_cars
      },
      message: 'Dealer statistics retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching dealer stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dealer statistics',
      message: error.message
    });
  }
});

module.exports = router;