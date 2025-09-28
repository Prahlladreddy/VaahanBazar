// src/pages/VehicleDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TestDriveForm from '../components/TestDriveForm';
import AddToComparison from '../components/AddToComparison';
import './VehicleDetails.css';

// Move mock data to module scope to avoid hook dependency / linter issues
const MOCK_VEHICLE = {
  _id: '1',
  name: 'Activa 6G',
  brand: 'Honda',
  model: 'Activa',
  price: 75000,
  images: ['https://example.com/activa6g.jpg'],
  specifications: {
    engine: '109.51 cc',
    power: '7.79 PS',
    torque: '8.79 Nm',
    mileage: '60 kmpl',
    fuelType: 'Petrol',
    transmission: 'Automatic'
  },
  description:
    'The Honda Activa 6G is a popular scooter known for its reliability and comfort. It comes with a fuel-injected engine, telescopic suspension, and combi-brake system. The scooter offers a smooth riding experience and is ideal for daily commuting.',
  isNew: true,
  features: [
    'Fuel Injection System',
    'Telescopic Suspension',
    'Combi-Brake System',
    'External Fuel Filling',
    'Side Stand Indicator with Engine Cut-off',
    'Silent Start System'
  ]
};

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      // simulate fetching by id; if id matches, return the mock, otherwise null
      const found = id ? (MOCK_VEHICLE._id === id ? MOCK_VEHICLE : null) : MOCK_VEHICLE;
      if (mounted) {
        setVehicle(found);
        setLoading(false);
      }
    }, 800);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="vehicle-details-container">
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="vehicle-details-container">
        <div className="error-container">
          <h2>Vehicle not found</h2>
          <p>The vehicle you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vehicle-details-container">
      <div className="vehicle-details-card">
        <div className="vehicle-image-section">
          {vehicle.images && vehicle.images.length > 0 ? (
            <img src={vehicle.images[0]} alt={vehicle.name} className="vehicle-image" />
          ) : (
            <div className="no-image-placeholder">
              <span>No Image Available</span>
            </div>
          )}
          <div className="vehicle-badge">{vehicle.isNew ? 'New' : 'Used'}</div>
        </div>

        <div className="vehicle-info-section">
          <div className="vehicle-header">
            <div>
              <h1 className="vehicle-name">{vehicle.name}</h1>
              <p className="vehicle-brand-model">
                {vehicle.brand} {vehicle.model}
              </p>
            </div>
            <p className="vehicle-price">₹{vehicle.price.toLocaleString()}</p>
          </div>

          <div className="vehicle-specs">
            <h2 className="section-title">Specifications</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Engine:</span>
                <span className="spec-value">{vehicle.specifications.engine}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Power:</span>
                <span className="spec-value">{vehicle.specifications.power}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Torque:</span>
                <span className="spec-value">{vehicle.specifications.torque}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Mileage:</span>
                <span className="spec-value">{vehicle.specifications.mileage}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Type:</span>
                <span className="spec-value">{vehicle.specifications.fuelType}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">{vehicle.specifications.transmission}</span>
              </div>
            </div>
          </div>

          <div className="vehicle-description">
            <h2 className="section-title">Description</h2>
            <p>{vehicle.description}</p>
          </div>

          {vehicle.features && (
            <div className="vehicle-features">
              <h2 className="section-title">Key Features</h2>
              <ul className="features-list">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="vehicle-actions">
            <TestDriveForm vehicleId={vehicle._id} />
            <AddToComparison vehicleId={vehicle._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
