const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/oem/models - Get number of OEM models available
router.get('/models', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        COUNT(*) as total_models,
        COUNT(DISTINCT manufacturer) as total_manufacturers,
        COUNT(DISTINCT model_name) as unique_models
      FROM OEM_Specs
    `);
    
    res.json({
      success: true,
      data: rows[0],
      message: 'OEM models count retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching OEM models count:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch OEM models count',
      message: error.message
    });
  }
});

// GET /api/oem/models/detailed - Get detailed list of all OEM models
router.get('/models/detailed', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        manufacturer,
        model_name,
        year_of_model,
        list_price,
        available_colors,
        mileage_kmpl,
        power_bhp,
        max_speed_kmph,
        created_at
      FROM OEM_Specs
      ORDER BY manufacturer, model_name, year_of_model DESC
    `);
    
    res.json({
      success: true,
      data: rows,
      count: rows.length,
      message: 'OEM models retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching OEM models:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch OEM models',
      message: error.message
    });
  }
});

// GET /api/oem/search - Search for specific OEM specs (e.g., Honda City 2015)
router.get('/search', async (req, res) => {
  try {
    const { manufacturer, model, year } = req.query;
    
    if (!manufacturer || !model || !year) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters',
        message: 'Please provide manufacturer, model, and year parameters'
      });
    }
    
    const [rows] = await pool.execute(`
      SELECT 
        id,
        manufacturer,
        model_name,
        year_of_model,
        list_price,
        available_colors,
        mileage_kmpl,
        power_bhp,
        max_speed_kmph,
        created_at
      FROM OEM_Specs
      WHERE manufacturer = ? AND model_name = ? AND year_of_model = ?
    `, [manufacturer, model, parseInt(year)]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'OEM specs not found',
        message: `No specifications found for ${manufacturer} ${model} ${year}`
      });
    }
    
    res.json({
      success: true,
      data: rows[0],
      message: `OEM specs for ${manufacturer} ${model} ${year} retrieved successfully`
    });
  } catch (error) {
    console.error('Error searching OEM specs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search OEM specs',
      message: error.message
    });
  }
});

// GET /api/oem/honda-city-2015 - Specific endpoint for Honda City 2015 as requested
router.get('/honda-city-2015', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        manufacturer,
        model_name,
        year_of_model,
        list_price,
        available_colors,
        mileage_kmpl,
        power_bhp,
        max_speed_kmph,
        created_at
      FROM OEM_Specs
      WHERE manufacturer = 'Honda' AND model_name = 'City' AND year_of_model = 2015
    `);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Honda City 2015 specs not found',
        message: 'No specifications found for Honda City 2015'
      });
    }
    
    res.json({
      success: true,
      data: rows[0],
      message: 'Honda City 2015 specifications retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching Honda City 2015 specs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Honda City 2015 specs',
      message: error.message
    });
  }
});

// GET /api/oem/manufacturers - Get list of all manufacturers
router.get('/manufacturers', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT DISTINCT manufacturer, COUNT(*) as model_count
      FROM OEM_Specs
      GROUP BY manufacturer
      ORDER BY manufacturer
    `);
    
    res.json({
      success: true,
      data: rows,
      message: 'Manufacturers retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch manufacturers',
      message: error.message
    });
  }
});

// GET /api/oem/models-by-manufacturer/:manufacturer - Get models by manufacturer
router.get('/models-by-manufacturer/:manufacturer', async (req, res) => {
  try {
    const { manufacturer } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT DISTINCT model_name, COUNT(*) as year_count
      FROM OEM_Specs
      WHERE manufacturer = ?
      GROUP BY model_name
      ORDER BY model_name
    `, [manufacturer]);
    
    res.json({
      success: true,
      data: rows,
      manufacturer: manufacturer,
      message: `Models for ${manufacturer} retrieved successfully`
    });
  } catch (error) {
    console.error('Error fetching models by manufacturer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch models by manufacturer',
      message: error.message
    });
  }
});

module.exports = router;
