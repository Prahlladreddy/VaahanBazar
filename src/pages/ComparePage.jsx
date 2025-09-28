// src/pages/ComparePage.jsx
import React, { useState, useEffect } from 'react';
import VehicleSelect from '../components/VehicleSelect';
import ComparisonTable from '../components/ComparisonTable';
import './ComparePage.css';

// Mock data placed at module scope (so it's not recreated every render)
const mockVehicles = [
  {
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
    isNew: true
  },
  {
    _id: '2',
    name: 'Splendor Plus',
    brand: 'Hero',
    model: 'Splendor',
    price: 65000,
    images: ['https://example.com/splendor.jpg'],
    specifications: {
      engine: '97.2 cc',
      power: '7.9 PS',
      torque: '8.05 Nm',
      mileage: '80 kmpl',
      fuelType: 'Petrol',
      transmission: '4-speed'
    },
    isNew: true
  },
  {
    _id: '3',
    name: 'Apache RTR 160',
    brand: 'TVS',
    model: 'Apache',
    price: 105000,
    images: ['https://example.com/apache.jpg'],
    specifications: {
      engine: '159.7 cc',
      power: '15.31 PS',
      torque: '13.9 Nm',
      mileage: '45 kmpl',
      fuelType: 'Petrol',
      transmission: '5-speed'
    },
    isNew: true
  },
  {
    _id: '4',
    name: 'Classic 350',
    brand: 'Royal Enfield',
    model: 'Classic',
    price: 185000,
    images: ['https://example.com/classic350.jpg'],
    specifications: {
      engine: '346 cc',
      power: '19.1 PS',
      torque: '28 Nm',
      mileage: '35 kmpl',
      fuelType: 'Petrol',
      transmission: '5-speed'
    },
    isNew: true
  }
];

const ComparePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch available vehicles
    setVehicles(mockVehicles);
  }, []);

  // When selectedVehicles changes, build comparison data (with debounce)
  useEffect(() => {
    if (selectedVehicles.length >= 2) {
      setLoading(true);

      const timer = setTimeout(() => {
        const data = selectedVehicles
          .map((id) => mockVehicles.find((v) => v._id === id))
          .filter(Boolean); // remove any undefined if id not found

        setComparisonData(data);
        setLoading(false);
      }, 800);

      // cleanup in case selection changes before timeout
      return () => clearTimeout(timer);
    } else {
      // not enough vehicles selected
      setComparisonData([]);
    }
  }, [selectedVehicles]);

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicles((prev) => {
      if (prev.includes(vehicleId)) {
        return prev.filter((id) => id !== vehicleId);
      } else if (prev.length < 4) {
        return [...prev, vehicleId];
      }
      return prev; // if already 4, ignore additional selects
    });
  };

  return (
    <div className="compare-container">
      <h1 className="compare-title">Compare Vehicles</h1>

      <div className="compare-selection">
        <div className="selection-card">
          <h2 className="section-title">Select Vehicles to Compare</h2>
          <p className="selection-subtitle">
            Select 2-4 vehicles to compare their specifications and features.
          </p>

          <VehicleSelect
            vehicles={vehicles}
            selectedVehicles={selectedVehicles}
            onVehicleSelect={handleVehicleSelect}
          />

          {selectedVehicles.length > 0 && (
            <div className="selection-actions">
              <button
                onClick={() => setSelectedVehicles([])}
                className="clear-btn"
                type="button"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading comparison data...</p>
        </div>
      ) : comparisonData.length > 0 ? (
        <div className="comparison-result">
          <ComparisonTable vehicles={comparisonData} />
        </div>
      ) : selectedVehicles.length >= 2 ? (
        <div className="message-card">
          <p>Loading comparison data...</p>
        </div>
      ) : selectedVehicles.length === 1 ? (
        <div className="message-card">
          <p>Please select at least one more vehicle to compare.</p>
        </div>
      ) : (
        <div className="message-card">
          <p>Select 2-4 vehicles from the list above to compare them.</p>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
