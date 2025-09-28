// src/components/VehicleSelect.jsx
import React from 'react';
import './VehicleSelect.css';

const VehicleSelect = ({ vehicles, selectedVehicles, onVehicleSelect }) => {
  return (
    <div className="vehicle-select">
      <div className="vehicle-grid">
        {vehicles.map(vehicle => (
          <div 
            key={vehicle._id} 
            className={`vehicle-item ${selectedVehicles.includes(vehicle._id) ? 'selected' : ''}`}
            onClick={() => onVehicleSelect(vehicle._id)}
          >
            <div className="vehicle-checkbox">
              {selectedVehicles.includes(vehicle._id) && (
                <span className="checkmark">✓</span>
              )}
            </div>
            <div className="vehicle-info">
              <div className="vehicle-name">{vehicle.name}</div>
              <div className="vehicle-price">₹{vehicle.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelect;