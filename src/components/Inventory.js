import React, { useState, useEffect, useCallback } from 'react';

const Inventory = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCars = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/simple/dealer/${user.id}`);
      const result = await response.json();
      
      if (response.ok) {
        setCars(result.data || []);
      } else {
        console.error('Failed to load cars:', result.message);
        setCars([]);
      }
    } catch (error) {
      console.error('Error loading cars:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleSelectCar = (carId) => {
    setSelectedCars(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCars.length === cars.length) {
      setSelectedCars([]);
    } else {
      setSelectedCars(cars.map(car => car.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCars.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedCars.length} car(s)?`)) {
      try {
        // Delete each selected car
        const deletePromises = selectedCars.map(carId => 
          fetch(`http://localhost:5000/api/dealer/inventory/${carId}`, {
            method: 'DELETE'
          })
        );
        
        await Promise.all(deletePromises);
        
        // Reload cars from database
        await loadCars();
        setSelectedCars([]);
      } catch (error) {
        console.error('Error deleting cars:', error);
        alert('Failed to delete some cars. Please try again.');
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/dealer/inventory/${carId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Reload cars from database
          await loadCars();
        } else {
          const result = await response.json();
          alert(`Failed to delete car: ${result.message}`);
        }
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Failed to delete car. Please try again.');
      }
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
  };

  const handleSaveEdit = async (updatedCar) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dealer/inventory/${updatedCar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedCar.title,
          price: updatedCar.price,
          image_url: updatedCar.image_url,
          description: updatedCar.description,
          color: updatedCar.color,
          actual_mileage: updatedCar.actual_mileage,
          km_on_odometer: updatedCar.km_on_odometer,
          number_of_accidents: updatedCar.number_of_accidents,
          number_of_previous_buyers: updatedCar.number_of_previous_buyers,
          registration_place: updatedCar.registration_place
        })
      });
      
      if (response.ok) {
        // Reload cars from database
        await loadCars();
        setEditingCar(null);
      } else {
        const result = await response.json();
        alert(`Failed to update car: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to update car. Please try again.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Loading your inventory...</div>;
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1>My Inventory</h1>
            <p>Manage your second-hand car listings</p>
          </div>
          <div>
            <a href="/add-car" className="btn btn-primary">
              Add New Car
            </a>
          </div>
        </div>

        {cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <h3>No cars in your inventory</h3>
            <p>Start by adding your first car to the marketplace.</p>
            <a href="/add-car" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Add Your First Car
            </a>
          </div>
        ) : (
          <>
            {/* Bulk Actions */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input
                  type="checkbox"
                  checked={selectedCars.length === cars.length && cars.length > 0}
                  onChange={handleSelectAll}
                />
                <span>
                  {selectedCars.length > 0 
                    ? `${selectedCars.length} selected` 
                    : 'Select all'
                  }
                </span>
              </div>
              
              {selectedCars.length > 0 && (
                <button 
                  onClick={handleDeleteSelected}
                  className="btn btn-danger"
                >
                  Delete Selected ({selectedCars.length})
                </button>
              )}
            </div>

            {/* Cars Grid */}
            <div className="grid grid-2">
              {cars.map(car => (
                <div key={car.id} className="car-card">
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={car.image} 
                      alt={car.title}
                      className="car-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Car+Image';
                      }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {car.year}
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      right: '10px'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedCars.includes(car.id)}
                        onChange={() => handleSelectCar(car.id)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </div>
                  </div>
                  
                  <div className="car-content">
                    <h3 className="car-title">{car.title}</h3>
                    <div className="car-price">{formatPrice(car.price)}</div>
                    
                    <ul className="car-specs">
                      {car.description.split('\n').slice(0, 3).map((point, index) => (
                        <li key={index}>{point.replace('• ', '')}</li>
                      ))}
                    </ul>
                    
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                      <div><strong>Color:</strong> {car.color} | <strong>Mileage:</strong> {car.mileage} km/l</div>
                      <div><strong>KM:</strong> {car.kmOnOdometer?.toLocaleString() || 'N/A'} | <strong>Accidents:</strong> {car.accidents}</div>
                      <div><strong>Added:</strong> {new Date(car.createdAt).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="car-actions">
                      <button 
                        onClick={() => handleEditCar(car)}
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCar(car.id)}
                        className="btn btn-danger"
                        style={{ flex: 1 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingCar && (
        <EditCarModal 
          car={editingCar} 
          onSave={handleSaveEdit} 
          onClose={() => setEditingCar(null)} 
        />
      )}
    </div>
  );
};

// Edit Car Modal Component
const EditCarModal = ({ car, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: car.title,
    price: car.price.toString(),
    image: car.image,
    description: car.description,
    color: car.color,
    mileage: car.mileage?.toString() || '',
    kmOnOdometer: car.kmOnOdometer?.toString() || '',
    accidents: car.accidents?.toString() || '0',
    previousBuyers: car.previousBuyers?.toString() || '0',
    registrationPlace: car.registrationPlace || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedCar = {
      ...car,
      ...formData,
      price: parseFloat(formData.price),
      mileage: parseFloat(formData.mileage) || 0,
      kmOnOdometer: parseFloat(formData.kmOnOdometer) || 0,
      accidents: parseInt(formData.accidents) || 0,
      previousBuyers: parseInt(formData.previousBuyers) || 0
    };
    
    onSave(updatedCar);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Edit Car Details</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Car Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Color</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="form-input"
              >
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
          
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Mileage (km/l)</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="form-input"
                step="0.1"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">KM on Odometer</label>
              <input
                type="number"
                name="kmOnOdometer"
                value={formData.kmOnOdometer}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Accidents</label>
              <input
                type="number"
                name="accidents"
                value={formData.accidents}
                onChange={handleChange}
                className="form-input"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Previous Buyers</label>
              <input
                type="number"
                name="previousBuyers"
                value={formData.previousBuyers}
                onChange={handleChange}
                className="form-input"
                min="0"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Registration Place</label>
            <input
              type="text"
              name="registrationPlace"
              value={formData.registrationPlace}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
