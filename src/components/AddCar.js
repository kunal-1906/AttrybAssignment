import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCar = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    oemModel: '',
    year: '',
    color: '',
    mileage: '',
    power: '',
    maxSpeed: '',
    kmOnOdometer: '',
    majorScratches: false,
    originalPaint: true,
    accidents: 0,
    previousBuyers: 0,
    registrationPlace: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title || !formData.price || !formData.image || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Prepare data for API
      const carData = {
        title: formData.title,
        price: parseFloat(formData.price),
        image_url: formData.image,
        description: formData.description,
        km_on_odometer: parseFloat(formData.kmOnOdometer) || null,
        major_scratches: formData.majorScratches,
        original_paint: formData.originalPaint,
        number_of_accidents: parseInt(formData.accidents) || 0,
        number_of_previous_buyers: parseInt(formData.previousBuyers) || 0,
        registration_place: formData.registrationPlace || null,
        color: formData.color || null,
        actual_mileage: parseFloat(formData.mileage) || null,
        power_bhp: parseFloat(formData.power) || null,
        max_speed_kmph: parseFloat(formData.maxSpeed) || null,
        year_of_manufacture: parseInt(formData.year) || null,
        oem_spec_id: null // We'll set this to null for now, can be enhanced later
      };

      // Call backend API
      const response = await fetch(`http://localhost:5000/api/simple/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dealer_id: user.id,
          title: carData.title,
          price: carData.price,
          image_url: carData.image_url,
          description: carData.description,
          color: carData.color,
          actual_mileage: carData.actual_mileage,
          year_of_manufacture: carData.year_of_manufacture
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add car');
      }

      setSuccess('Car added successfully to database!');
      
      // Reset form
      setFormData({
        title: '',
        price: '',
        image: '',
        description: '',
        oemModel: '',
        year: '',
        color: '',
        mileage: '',
        power: '',
        maxSpeed: '',
        kmOnOdometer: '',
        majorScratches: false,
        originalPaint: true,
        accidents: 0,
        previousBuyers: 0,
        registrationPlace: ''
      });

      // Redirect to inventory after 2 seconds
      setTimeout(() => {
        navigate('/inventory');
      }, 2000);

    } catch (error) {
      console.error('Error adding car:', error);
      setError(`Failed to add car: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="card">
        <h1>Add New Car to Inventory</h1>
        <p>Fill in the details below to add a second-hand car to your inventory.</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="card">
        <h2>Basic Information</h2>
        
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Car Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Honda City 2015 - Well Maintained"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              placeholder="500000"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Image URL *</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com/car-image.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description (5 bullet points) *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="• Single owner car&#10;• Regular service history&#10;• No major accidents&#10;• All original parts&#10;• Ready to drive"
            required
          />
        </div>

        <h2>OEM Specifications</h2>
        
        <div className="grid grid-3">
          <div className="form-group">
            <label htmlFor="oemModel" className="form-label">OEM Model</label>
            <input
              type="text"
              id="oemModel"
              name="oemModel"
              value={formData.oemModel}
              onChange={handleChange}
              className="form-input"
              placeholder="Honda City"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year" className="form-label">Model Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="form-input"
              placeholder="2015"
              min="1990"
              max="2024"
            />
          </div>

          <div className="form-group">
            <label htmlFor="color" className="form-label">Color</label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Color</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Silver">Silver</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Grey">Grey</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-3">
          <div className="form-group">
            <label htmlFor="mileage" className="form-label">Mileage (km/l)</label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="form-input"
              placeholder="15.5"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="power" className="form-label">Power (BHP)</label>
            <input
              type="number"
              id="power"
              name="power"
              value={formData.power}
              onChange={handleChange}
              className="form-input"
              placeholder="120"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxSpeed" className="form-label">Max Speed (km/h)</label>
            <input
              type="number"
              id="maxSpeed"
              name="maxSpeed"
              value={formData.maxSpeed}
              onChange={handleChange}
              className="form-input"
              placeholder="180"
            />
          </div>
        </div>

        <h2>Vehicle Condition</h2>
        
        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="kmOnOdometer" className="form-label">KM on Odometer</label>
            <input
              type="number"
              id="kmOnOdometer"
              name="kmOnOdometer"
              value={formData.kmOnOdometer}
              onChange={handleChange}
              className="form-input"
              placeholder="45000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="registrationPlace" className="form-label">Registration Place</label>
            <input
              type="text"
              id="registrationPlace"
              name="registrationPlace"
              value={formData.registrationPlace}
              onChange={handleChange}
              className="form-input"
              placeholder="Mumbai"
            />
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label htmlFor="accidents" className="form-label">Number of Accidents</label>
            <input
              type="number"
              id="accidents"
              name="accidents"
              value={formData.accidents}
              onChange={handleChange}
              className="form-input"
              placeholder="0"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="previousBuyers" className="form-label">Previous Buyers</label>
            <input
              type="number"
              id="previousBuyers"
              name="previousBuyers"
              value={formData.previousBuyers}
              onChange={handleChange}
              className="form-input"
              placeholder="1"
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="majorScratches"
                name="majorScratches"
                checked={formData.majorScratches}
                onChange={handleChange}
              />
              <label htmlFor="majorScratches">Has Major Scratches</label>
            </div>
            
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="originalPaint"
                name="originalPaint"
                checked={formData.originalPaint}
                onChange={handleChange}
              />
              <label htmlFor="originalPaint">Original Paint</label>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button type="submit" className="btn btn-primary">
            Add Car to Inventory
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/inventory')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
