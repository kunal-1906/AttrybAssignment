
-- IOEM Specifications
INSERT INTO OEM_Specs (manufacturer, model_name, year_of_model, list_price, available_colors, mileage_kmpl, power_bhp, max_speed_kmph) VALUES
('Honda', 'City', 2015, 850000.00, '["White", "Black", "Silver", "Red", "Blue"]', 15.5, 120, 180),
('Honda', 'City', 2016, 900000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 16.2, 120, 180),
('Honda', 'City', 2017, 950000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 16.5, 120, 180),
('Honda', 'City', 2018, 1000000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 17.0, 120, 180),
('Honda', 'City', 2019, 1050000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 17.2, 120, 180),

('Maruti Suzuki', 'Swift', 2015, 450000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 18.5, 90, 160),
('Maruti Suzuki', 'Swift', 2016, 480000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 19.0, 90, 160),
('Maruti Suzuki', 'Swift', 2017, 520000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 19.2, 90, 160),
('Maruti Suzuki', 'Swift', 2018, 550000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 19.5, 90, 160),
('Maruti Suzuki', 'Swift', 2019, 580000.00, '["White", "Black", "Silver", "Red", "Blue", "Grey"]', 20.0, 90, 160),

('BMW', '3 Series', 2015, 3500000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 12.5, 180, 220),
('BMW', '3 Series', 2016, 3700000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 13.0, 180, 220),
('BMW', '3 Series', 2017, 3900000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 13.2, 180, 220),
('BMW', '3 Series', 2018, 4100000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 13.5, 180, 220),
('BMW', '3 Series', 2019, 4300000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 14.0, 180, 220),

('Audi', 'A4', 2015, 2800000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 14.2, 150, 200),
('Audi', 'A4', 2016, 3000000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 14.5, 150, 200),
('Audi', 'A4', 2017, 3200000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 14.8, 150, 200),
('Audi', 'A4', 2018, 3400000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 15.0, 150, 200),
('Audi', 'A4', 2019, 3600000.00, '["White", "Black", "Silver", "Grey", "Blue"]', 15.2, 150, 200),

('Toyota', 'Camry', 2015, 2200000.00, '["White", "Black", "Silver", "Grey", "Red"]', 15.8, 140, 190),
('Toyota', 'Camry', 2016, 2400000.00, '["White", "Black", "Silver", "Grey", "Red"]', 16.0, 140, 190),
('Toyota', 'Camry', 2017, 2600000.00, '["White", "Black", "Silver", "Grey", "Red"]', 16.2, 140, 190),
('Toyota', 'Camry', 2018, 2800000.00, '["White", "Black", "Silver", "Grey", "Red"]', 16.5, 140, 190),
('Toyota', 'Camry', 2019, 3000000.00, '["White", "Black", "Silver", "Grey", "Red"]', 16.8, 140, 190),

('Hyundai', 'Creta', 2015, 1200000.00, '["White", "Black", "Silver", "Grey", "Red", "Blue"]', 16.5, 110, 170),
('Hyundai', 'Creta', 2016, 1300000.00, '["White", "Black", "Silver", "Grey", "Red", "Blue"]', 17.0, 110, 170),
('Hyundai', 'Creta', 2017, 1400000.00, '["White", "Black", "Silver", "Grey", "Red", "Blue"]', 17.2, 110, 170),
('Hyundai', 'Creta', 2018, 1500000.00, '["White", "Black", "Silver", "Grey", "Red", "Blue"]', 17.5, 110, 170),
('Hyundai', 'Creta', 2019, 1600000.00, '["White", "Black", "Silver", "Grey", "Red", "Blue"]', 18.0, 110, 170);

-- Dealers
INSERT INTO Dealers (name, email, phone, address, city, state, pincode, registration_number, is_verified) VALUES
('Auto Dealer Mumbai', 'dealer@buyc.com', '+91-9876543210', '123 MG Road, Andheri West', 'Mumbai', 'Maharashtra', '400058', 'ADM2023001', TRUE),
('Swift Motors', 'swift@buyc.com', '+91-9876543211', '456 Park Street, Connaught Place', 'Delhi', 'Delhi', '110001', 'SM2023002', TRUE),
('Luxury Cars India', 'luxury@buyc.com', '+91-9876543212', '789 Brigade Road, MG Road', 'Bangalore', 'Karnataka', '560001', 'LCI2023003', TRUE),
('Audi Specialist', 'audi@buyc.com', '+91-9876543213', '321 Koregaon Park, Pune', 'Pune', 'Maharashtra', '411001', 'AS2023004', TRUE),
('Premium Auto', 'premium@buyc.com', '+91-9876543214', '654 Salt Lake City, Sector V', 'Kolkata', 'West Bengal', '700091', 'PA2023005', TRUE);

-- Buyers
INSERT INTO Buyers (name, email, phone, address, city, state, pincode) VALUES
('Rajesh Kumar', 'rajesh@email.com', '+91-9876543220', '789 Model Town, Delhi', 'Delhi', 'Delhi', '110009'),
('Priya Sharma', 'priya@email.com', '+91-9876543221', '456 Bandra West, Mumbai', 'Mumbai', 'Maharashtra', '400050'),
('Amit Patel', 'amit@email.com', '+91-9876543222', '123 Indiranagar, Bangalore', 'Bangalore', 'Karnataka', '560008'),
('Sneha Reddy', 'sneha@email.com', '+91-9876543223', '321 Banjara Hills, Hyderabad', 'Hyderabad', 'Telangana', '500034'),
('Vikram Singh', 'vikram@email.com', '+91-9876543224', '654 Salt Lake, Kolkata', 'Kolkata', 'West Bengal', '700064');

-- Marketplace Inventory
INSERT INTO Marketplace_Inventory (
    dealer_id, oem_spec_id, title, price, image_url, description, 
    km_on_odometer, major_scratches, original_paint, number_of_accidents, 
    number_of_previous_buyers, registration_place, color, actual_mileage, 
    power_bhp, max_speed_kmph, year_of_manufacture, status
) VALUES
(1, 1, 'Honda City 2015 - Well Maintained', 450000.00, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', 
 '• Single owner car\n• Regular service history\n• No major accidents\n• All original parts\n• Ready to drive', 
 45000, FALSE, TRUE, 0, 1, 'Mumbai', 'White', 15.5, 120, 180, 2015, 'active'),

(2, 6, 'Maruti Swift 2018 - Excellent Condition', 380000.00, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', 
 '• Low mileage\n• Recent service done\n• No accidents\n• All documents ready\n• Great fuel efficiency', 
 32000, FALSE, TRUE, 0, 0, 'Delhi', 'Red', 18.2, 90, 160, 2018, 'active'),

(3, 11, 'BMW 3 Series 2016 - Luxury Sedan', 1200000.00, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', 
 '• Premium luxury car\n• Full service history\n• Minor accident (repaired)\n• All features working\n• Executive condition', 
 65000, FALSE, FALSE, 1, 2, 'Bangalore', 'Black', 12.5, 180, 220, 2016, 'active'),

(4, 16, 'Audi A4 2017 - Sporty & Reliable', 950000.00, 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop', 
 '• Sporty design\n• Regular maintenance\n• No accidents\n• Premium interior\n• Excellent performance', 
 55000, FALSE, TRUE, 0, 1, 'Pune', 'Silver', 14.2, 150, 200, 2017, 'active'),

(5, 21, 'Toyota Camry 2018 - Comfort & Reliability', 1800000.00, 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop', 
 '• Executive sedan\n• Excellent condition\n• No accidents\n• Full service history\n• Premium features', 
 42000, FALSE, TRUE, 0, 0, 'Kolkata', 'Grey', 16.0, 140, 190, 2018, 'active'),

(1, 26, 'Hyundai Creta 2019 - SUV Excellence', 1100000.00, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop', 
 '• Modern SUV design\n• Low mileage\n• No accidents\n• All features working\n• Great for families', 
 28000, FALSE, TRUE, 0, 0, 'Mumbai', 'White', 17.5, 110, 170, 2019, 'active'),

(2, 2, 'Honda City 2016 - Fuel Efficient', 520000.00, 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop', 
 '• Great fuel efficiency\n• Well maintained\n• Minor scratches\n• All documents ready\n• Reliable engine', 
 58000, TRUE, TRUE, 0, 1, 'Delhi', 'Silver', 16.2, 120, 180, 2016, 'active'),

(3, 12, 'BMW 3 Series 2017 - Performance', 1400000.00, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', 
 '• High performance\n• Premium features\n• No accidents\n• Excellent condition\n• Luxury interior', 
 48000, FALSE, TRUE, 0, 1, 'Bangalore', 'Blue', 13.2, 180, 220, 2017, 'active'),

(4, 17, 'Audi A4 2018 - Latest Model', 1200000.00, 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop', 
 '• Latest generation\n• Advanced features\n• No accidents\n• Excellent condition\n• Premium build quality', 
 35000, FALSE, TRUE, 0, 0, 'Pune', 'Black', 15.0, 150, 200, 2018, 'active'),

(5, 22, 'Toyota Camry 2019 - Top Model', 2200000.00, 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop', 
 '• Top variant\n• All features\n• No accidents\n• Excellent condition\n• Premium comfort', 
 25000, FALSE, TRUE, 0, 0, 'Kolkata', 'White', 16.8, 140, 190, 2019, 'active');

-- Car Images (additional images for some cars)
INSERT INTO Car_Images (inventory_id, image_url, is_primary, display_order) VALUES
(1, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', TRUE, 1),
(1, 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop', FALSE, 2),
(2, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', TRUE, 1),
(3, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', TRUE, 1),
(4, 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop', TRUE, 1),
(5, 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop', TRUE, 1),
(6, 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop', TRUE, 1);

-- Insert some sample transactions
INSERT INTO Transactions (inventory_id, buyer_id, dealer_id, transaction_amount, payment_method, payment_status, notes) VALUES
(1, 1, 1, 450000.00, 'Bank Transfer', 'completed', 'Smooth transaction, car delivered'),
(2, 2, 2, 380000.00, 'UPI', 'completed', 'Quick sale, buyer satisfied'),
(3, 3, 3, 1200000.00, 'Cheque', 'completed', 'Luxury car sale, full payment received');

-- Insert some search history
INSERT INTO Search_History (user_id, user_type, search_query, filters_applied, results_count) VALUES
(1, 'buyer', 'Honda City', '{"minPrice": 400000, "maxPrice": 600000, "colors": ["White", "Silver"]}', 2),
(2, 'buyer', 'BMW', '{"minPrice": 1000000, "maxPrice": 2000000}', 1),
(3, 'dealer', 'luxury cars', '{"status": "active"}', 3),
(4, 'buyer', 'SUV', '{"colors": ["White", "Black"]}', 1);
