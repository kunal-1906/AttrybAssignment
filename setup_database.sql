-- Quick Database Setup for BUYC Corp
-- Run this script in your MySQL client

-- Create database
CREATE DATABASE IF NOT EXISTS buyc_marketplace;
USE buyc_marketplace;

-- Import the schema
SOURCE database/schema.sql;

-- Import the sample data
SOURCE database/seed_data.sql;

-- Verify the setup
SELECT 'Database setup complete!' as status;
SELECT COUNT(*) as oem_specs_count FROM OEM_Specs;
SELECT COUNT(*) as inventory_count FROM Marketplace_Inventory;
SELECT COUNT(*) as dealers_count FROM Dealers;
