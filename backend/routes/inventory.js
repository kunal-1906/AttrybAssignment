const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/inventory - Get all marketplace inventory with optional filters
router.get('/', async (req, res) => {
  try {
    const { 
      minPrice, 
      maxPrice, 
      color, 
      minMileage, 
      maxMileage, 
      manufacturer,
      model,
      year,
      dealerId,
      status = 'active',
      limit = 50,
      offset = 0
    } = req.query;
    
    let query = `
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
        d.name as dealer_name,
        d.email as dealer_email,
        d.phone as dealer_phone,
        d.city as dealer_city,
        os.manufacturer as oem_manufacturer,
        os.model_name as oem_model,
        os.year_of_model as oem_year,
        os.list_price as oem_list_price
      FROM Marketplace_Inventory mi
      LEFT JOIN Dealers d ON mi.dealer_id = d.id
      LEFT JOIN OEM_Specs os ON mi.oem_spec_id = os.id
      WHERE mi.status = ?
    `;
    
    const queryParams = [status];
    
    // Add filters
    if (minPrice) {
      query += ' AND mi.price >= ?';
      queryParams.push(parseFloat(minPrice));
    }
    
    if (maxPrice) {
      query += ' AND mi.price <= ?';
      queryParams.push(parseFloat(maxPrice));
    }
    
    if (color) {
      query += ' AND mi.color = ?';
      queryParams.push(color);
    }
    
    if (minMileage) {
      query += ' AND mi.actual_mileage >= ?';
      queryParams.push(parseFloat(minMileage));
    }
    
    if (maxMileage) {
      query += ' AND mi.actual_mileage <= ?';
      queryParams.push(parseFloat(maxMileage));
    }
    
    if (manufacturer) {
      query += ' AND os.manufacturer = ?';
      queryParams.push(manufacturer);
    }
    
    if (model) {
      query += ' AND os.model_name = ?';
      queryParams.push(model);
    }
    
    if (year) {
      query += ' AND mi.year_of_manufacture = ?';
      queryParams.push(parseInt(year));
    }
    
    if (dealerId) {
      query += ' AND mi.dealer_id = ?';
      queryParams.push(parseInt(dealerId));
    }
    
    query += ' ORDER BY mi.created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));
    
    const [rows] = await pool.execute(query, queryParams);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM Marketplace_Inventory mi
      LEFT JOIN OEM_Specs os ON mi.oem_spec_id = os.id
      WHERE mi.status = ?
    `;
    
    const countParams = [status];
    
    if (minPrice) {
      countQuery += ' AND mi.price >= ?';
      countParams.push(parseFloat(minPrice));
    }
    
    if (maxPrice) {
      countQuery += ' AND mi.price <= ?';
      countParams.push(parseFloat(maxPrice));
    }
    
    if (color) {
      countQuery += ' AND mi.color = ?';
      countParams.push(color);
    }
    
    if (minMileage) {
      countQuery += ' AND mi.actual_mileage >= ?';
      countParams.push(parseFloat(minMileage));
    }
    
    if (maxMileage) {
      countQuery += ' AND mi.actual_mileage <= ?';
      countParams.push(parseFloat(maxMileage));
    }
    
    if (manufacturer) {
      countQuery += ' AND os.manufacturer = ?';
      countParams.push(manufacturer);
    }
    
    if (model) {
      countQuery += ' AND os.model_name = ?';
      countParams.push(model);
    }
    
    if (year) {
      countQuery += ' AND mi.year_of_manufacture = ?';
      countParams.push(parseInt(year));
    }
    
    if (dealerId) {
      countQuery += ' AND mi.dealer_id = ?';
      countParams.push(parseInt(dealerId));
    }
    
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      },
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

// GET /api/inventory/:id - Get specific car details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.execute(`
      SELECT 
        mi.*,
        d.name as dealer_name,
        d.email as dealer_email,
        d.phone as dealer_phone,
        d.address as dealer_address,
        d.city as dealer_city,
        d.state as dealer_state,
        os.manufacturer as oem_manufacturer,
        os.model_name as oem_model,
        os.year_of_model as oem_year,
        os.list_price as oem_list_price,
        os.available_colors as oem_colors,
        os.mileage_kmpl as oem_mileage,
        os.power_bhp as oem_power,
        os.max_speed_kmph as oem_max_speed
      FROM Marketplace_Inventory mi
      LEFT JOIN Dealers d ON mi.dealer_id = d.id
      LEFT JOIN OEM_Specs os ON mi.oem_spec_id = os.id
      WHERE mi.id = ?
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Car not found',
        message: `No car found with ID ${id}`
      });
    }
    
    // Get additional images
    const [imageRows] = await pool.execute(`
      SELECT image_url, is_primary, display_order
      FROM Car_Images
      WHERE inventory_id = ?
      ORDER BY is_primary DESC, display_order ASC
    `, [id]);
    
    const carData = rows[0];
    carData.images = imageRows;
    
    res.json({
      success: true,
      data: carData,
      message: 'Car details retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch car details',
      message: error.message
    });
  }
});

// GET /api/inventory/filters/options - Get filter options
router.get('/filters/options', async (req, res) => {
  try {
    const [colors] = await pool.execute(`
      SELECT DISTINCT color, COUNT(*) as count
      FROM Marketplace_Inventory
      WHERE status = 'active' AND color IS NOT NULL
      GROUP BY color
      ORDER BY count DESC
    `);
    
    const [manufacturers] = await pool.execute(`
      SELECT DISTINCT os.manufacturer, COUNT(*) as count
      FROM Marketplace_Inventory mi
      LEFT JOIN OEM_Specs os ON mi.oem_spec_id = os.id
      WHERE mi.status = 'active' AND os.manufacturer IS NOT NULL
      GROUP BY os.manufacturer
      ORDER BY count DESC
    `);
    
    const [years] = await pool.execute(`
      SELECT DISTINCT year_of_manufacture, COUNT(*) as count
      FROM Marketplace_Inventory
      WHERE status = 'active' AND year_of_manufacture IS NOT NULL
      GROUP BY year_of_manufacture
      ORDER BY year_of_manufacture DESC
    `);
    
    const [priceRange] = await pool.execute(`
      SELECT 
        MIN(price) as min_price,
        MAX(price) as max_price
      FROM Marketplace_Inventory
      WHERE status = 'active'
    `);
    
    const [mileageRange] = await pool.execute(`
      SELECT 
        MIN(actual_mileage) as min_mileage,
        MAX(actual_mileage) as max_mileage
      FROM Marketplace_Inventory
      WHERE status = 'active' AND actual_mileage IS NOT NULL
    `);
    
    res.json({
      success: true,
      data: {
        colors,
        manufacturers,
        years,
        priceRange: priceRange[0],
        mileageRange: mileageRange[0]
      },
      message: 'Filter options retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch filter options',
      message: error.message
    });
  }
});

module.exports = router;