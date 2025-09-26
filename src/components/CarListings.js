import React, { useState, useEffect, useCallback } from 'react';

const CarListings = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    colors: [],
    minMileage: '',
    maxMileage: ''
  });
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  const sampleCars = [
    {
      id: 1,
      title: "Honda City 2015 - Well Maintained",
      price: 450000,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      description: "• Single owner car\n• Regular service history\n• No major accidents\n• All original parts\n• Ready to drive",
      oemModel: "Honda City",
      year: 2015,
      color: "White",
      mileage: 15.5,
      power: 120,
      maxSpeed: 180,
      kmOnOdometer: 45000,
      majorScratches: false,
      originalPaint: true,
      accidents: 0,
      previousBuyers: 1,
      registrationPlace: "Mumbai",
      dealerName: "Auto Dealer Mumbai"
    },
    {
      id: 2,
      title: "Maruti Swift 2018 - Excellent Condition",
      price: 380000,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
      description: "• Low mileage\n• Recent service done\n• No accidents\n• All documents ready\n• Great fuel efficiency",
      oemModel: "Maruti Swift",
      year: 2018,
      color: "Red",
      mileage: 18.2,
      power: 90,
      maxSpeed: 160,
      kmOnOdometer: 32000,
      majorScratches: false,
      originalPaint: true,
      accidents: 0,
      previousBuyers: 0,
      registrationPlace: "Delhi",
      dealerName: "Swift Motors"
    },
    {
      id: 3,
      title: "BMW 3 Series 2016 - Luxury Sedan",
      price: 1200000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      description: "• Premium luxury car\n• Full service history\n• Minor accident (repaired)\n• All features working\n• Executive condition",
      oemModel: "BMW 3 Series",
      year: 2016,
      color: "Black",
      mileage: 12.5,
      power: 180,
      maxSpeed: 220,
      kmOnOdometer: 65000,
      majorScratches: false,
      originalPaint: false,
      accidents: 1,
      previousBuyers: 2,
      registrationPlace: "Bangalore",
      dealerName: "Luxury Cars India"
    },
    {
      id: 4,
      title: "Audi A4 2017 - Sporty & Reliable",
      price: 950000,
      image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop",
      description: "• Sporty design\n• Regular maintenance\n• No accidents\n• Premium interior\n• Excellent performance",
      oemModel: "Audi A4",
      year: 2017,
      color: "Silver",
      mileage: 14.2,
      power: 150,
      maxSpeed: 200,
      kmOnOdometer: 55000,
      majorScratches: false,
      originalPaint: true,
      accidents: 0,
      previousBuyers: 1,
      registrationPlace: "Pune",
      dealerName: "Audi Specialist"
    }
  ];

  const loadCars = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/simple/');
      const result = await response.json();
      
      if (response.ok) {
        // Map API rows to UI car model
        const apiCars = (result.data || []).map((r) => ({
          id: r.id,
          title: r.title,
          price: Number(r.price) || 0,
          image: r.image_url,
          // Normalize description: clean any OC* codes at start of lines and ensure newlines
          description: String(r.description || '')
            .replace(/\\n/g, '\n')
            .replace(/(^|\n)\s*OC-?\s*\d+\s*[:\-]?\s*/gi, '$1')
            .replace(/(^|\n)\s*OC\d+\s*[:\-]?\s*/gi, '$1'),
          year: r.year_of_manufacture || r.year || null,
          color: r.color || '',
          mileage: r.actual_mileage ?? r.mileage ?? null,
          kmOnOdometer: r.km_on_odometer ?? null,
          dealerName: r.dealer_name || 'Dealer',
        }));

        const allCars = [...sampleCars, ...apiCars];
        setCars(allCars);
        setFilteredCars(allCars);
      } else {
        console.error('Failed to load cars:', result.message);
        // Fallback to sample data
        setCars(sampleCars);
        setFilteredCars(sampleCars);
      }
    } catch (error) {
      console.error('Error loading cars:', error);
      // Fallback to sample data
      setCars(sampleCars);
      setFilteredCars(sampleCars);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...cars];

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(car => filters.colors.includes(car.color));
    }

    // Mileage filter
    if (filters.minMileage) {
      filtered = filtered.filter(car => car.mileage >= parseFloat(filters.minMileage));
    }
    if (filters.maxMileage) {
      filtered = filtered.filter(car => car.mileage <= parseFloat(filters.maxMileage));
    }

    setFilteredCars(filtered);
  }, [cars, filters]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const color = value;
      setFilters(prev => ({
        ...prev,
        colors: checked 
          ? [...prev.colors, color]
          : prev.colors.filter(c => c !== color)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      colors: [],
      minMileage: '',
      maxMileage: ''
    });
  };

  const availableColors = [...new Set(cars.map(car => car.color))];

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  return (
    <div>
      <div className="card">
        <h1>Browse Second-Hand Cars</h1>
        <p>Find your perfect car from our extensive inventory of quality second-hand vehicles.</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <h3>Filter Cars</h3>
        <div className="filter-group">
          <div className="filter-item">
            <label className="form-label">Min Price (₹)</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="0"
            />
          </div>
          
          <div className="filter-item">
            <label className="form-label">Max Price (₹)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="2000000"
            />
          </div>
          
          <div className="filter-item">
            <label className="form-label">Min Mileage (km/l)</label>
            <input
              type="number"
              name="minMileage"
              value={filters.minMileage}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="10"
              step="0.1"
            />
          </div>
          
          <div className="filter-item">
            <label className="form-label">Max Mileage (km/l)</label>
            <input
              type="number"
              name="maxMileage"
              value={filters.maxMileage}
              onChange={handleFilterChange}
              className="form-input"
              placeholder="25"
              step="0.1"
            />
          </div>
          
          <div className="filter-item">
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>
        
        <div className="filter-group" style={{ marginTop: '15px' }}>
          <div className="filter-item">
            <label className="form-label">Colors</label>
            <div className="checkbox-group">
              {availableColors.map(color => (
                <div key={color} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`color-${color}`}
                    value={color}
                    checked={filters.colors.includes(color)}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor={`color-${color}`}>{color}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <h3>Available Cars ({filteredCars.length})</h3>
        {filteredCars.length === 0 ? (
          <p>No cars match your current filters. Try adjusting your search criteria.</p>
        ) : (
          <div className="grid grid-2">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <img 
                  src={car.image} 
                  alt={car.title}
                  className="car-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Car+Image';
                  }}
                />
                <div className="car-content">
                  <h3 className="car-title">{car.title}</h3>
                  <div className="car-price">₹{car.price.toLocaleString()}</div>
                  
                  <ul className="car-specs">
                    {car.description.split('\n').map((point, index) => (
                      <li key={index}>{point.replace('• ', '')}</li>
                    ))}
                  </ul>
                  
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                    <div><strong>Year:</strong> {car.year} | <strong>Color:</strong> {car.color}</div>
                    <div><strong>Mileage:</strong> {car.mileage} km/l | <strong>KM:</strong> {car.kmOnOdometer?.toLocaleString() || 'N/A'}</div>
                    <div><strong>Dealer:</strong> {car.dealerName}</div>
                  </div>
                  
                  <div className="car-actions">
                    <button className="btn btn-primary" style={{ flex: 1 }}>
                      View Details
                    </button>
                    <button className="btn btn-success" style={{ flex: 1 }}>
                      Contact Dealer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListings;
