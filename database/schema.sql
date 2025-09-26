-- BUYC Corp Database Schema
-- Phase II: Database Design and Implementation

-- OEM Specifications Table
-- Stores manufacturer specifications for different car models
CREATE TABLE OEM_Specs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    manufacturer VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    year_of_model INT NOT NULL,
    list_price DECIMAL(12,2) NOT NULL,
    available_colors JSON NOT NULL,
    mileage_kmpl DECIMAL(4,2) NOT NULL,
    power_bhp INT NOT NULL,
    max_speed_kmph INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_manufacturer_model (manufacturer, model_name),
    INDEX idx_year (year_of_model),
    INDEX idx_price (list_price)
);

-- Marketplace Inventory Table
-- Stores dealer's actual inventory with condition details
CREATE TABLE Marketplace_Inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dealer_id INT NOT NULL,
    oem_spec_id INT,
    
    -- Basic Information
    title VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    
    -- Vehicle Condition
    km_on_odometer INT,
    major_scratches BOOLEAN DEFAULT FALSE,
    original_paint BOOLEAN DEFAULT TRUE,
    number_of_accidents INT DEFAULT 0,
    number_of_previous_buyers INT DEFAULT 0,
    registration_place VARCHAR(100),
    
    -- Additional Details
    color VARCHAR(50),
    actual_mileage DECIMAL(4,2),
    power_bhp INT,
    max_speed_kmph INT,
    year_of_manufacture INT,
    
    -- Status and Timestamps
    status ENUM('active', 'sold', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (oem_spec_id) REFERENCES OEM_Specs(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_dealer (dealer_id),
    INDEX idx_price (price),
    INDEX idx_status (status),
    INDEX idx_color (color),
    INDEX idx_year (year_of_manufacture),
    INDEX idx_mileage (actual_mileage)
);

-- Dealers Table
-- Stores dealer information
CREATE TABLE Dealers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    registration_number VARCHAR(100) UNIQUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_city (city),
    INDEX idx_verified (is_verified)
);

-- Buyers Table
-- Stores buyer information
CREATE TABLE Buyers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_city (city)
);

-- Transactions Table
-- Stores purchase transactions
CREATE TABLE Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inventory_id INT NOT NULL,
    buyer_id INT NOT NULL,
    dealer_id INT NOT NULL,
    transaction_amount DECIMAL(12,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    
    FOREIGN KEY (inventory_id) REFERENCES Marketplace_Inventory(id),
    FOREIGN KEY (buyer_id) REFERENCES Buyers(id),
    FOREIGN KEY (dealer_id) REFERENCES Dealers(id),
    
    INDEX idx_buyer (buyer_id),
    INDEX idx_dealer (dealer_id),
    INDEX idx_transaction_date (transaction_date),
    INDEX idx_payment_status (payment_status)
);

-- Car Images Table
-- Stores multiple images for each car
CREATE TABLE Car_Images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inventory_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (inventory_id) REFERENCES Marketplace_Inventory(id) ON DELETE CASCADE,
    
    INDEX idx_inventory (inventory_id),
    INDEX idx_primary (is_primary)
);

-- Search History Table
-- Stores user search history for analytics
CREATE TABLE Search_History (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    user_type ENUM('dealer', 'buyer') NOT NULL,
    search_query VARCHAR(255),
    filters_applied JSON,
    results_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user (user_id, user_type),
    INDEX idx_created_at (created_at)
);
