-- Safe Database Setup for BUYC Corp
-- This handles existing foreign key constraints

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS buyc_marketplace;
USE buyc_marketplace;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS Car_Images;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Search_History;
DROP TABLE IF EXISTS Marketplace_Inventory;
DROP TABLE IF EXISTS Dealers;
DROP TABLE IF EXISTS Buyers;
DROP TABLE IF EXISTS OEM_Specs;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Create Dealers table
CREATE TABLE Dealers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create OEM_Specs table
CREATE TABLE OEM_Specs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    manufacturer VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    year_of_model INT NOT NULL,
    list_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Marketplace_Inventory table
CREATE TABLE Marketplace_Inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dealer_id INT NOT NULL,
    oem_spec_id INT,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    color VARCHAR(50),
    actual_mileage DECIMAL(4,2),
    year_of_manufacture INT,
    status ENUM('active', 'sold', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dealer_id) REFERENCES Dealers(id) ON DELETE CASCADE,
    FOREIGN KEY (oem_spec_id) REFERENCES OEM_Specs(id) ON DELETE SET NULL
);

-- Insert sample dealer
INSERT INTO Dealers (id, name, email, phone, city) VALUES 
(1, 'John Dealer', 'dealer@buyc.com', '+91-9876543210', 'Mumbai');

-- Insert sample OEM specs
INSERT INTO OEM_Specs (manufacturer, model_name, year_of_model, list_price) VALUES
('Honda', 'City', 2015, 850000.00),
('Maruti Suzuki', 'Swift', 2018, 550000.00),
('BMW', '3 Series', 2016, 3700000.00);

-- Insert sample inventory
INSERT INTO Marketplace_Inventory (dealer_id, oem_spec_id, title, price, image_url, description, color, actual_mileage, year_of_manufacture) VALUES
(1, 1, 'Honda City 2015 - Well Maintained', 450000.00, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', '• Single owner car\n• Regular service history\n• No major accidents\n• All original parts\n• Ready to drive', 'White', 15.5, 2015),
(1, 2, 'Maruti Swift 2018 - Excellent Condition', 380000.00, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', '• Low mileage\n• Recent service done\n• No accidents\n• All documents ready\n• Great fuel efficiency', 'Red', 18.2, 2018),
(1, 3, 'BMW 3 Series 2016 - Luxury Sedan', 1200000.00, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', '• Premium luxury car\n• Full service history\n• Minor accident (repaired)\n• All features working\n• Executive condition', 'Black', 12.5, 2016);

-- Verify the setup
SELECT 'Database setup complete!' as status;
SELECT COUNT(*) as dealers_count FROM Dealers;
SELECT COUNT(*) as oem_specs_count FROM OEM_Specs;
SELECT COUNT(*) as inventory_count FROM Marketplace_Inventory;
