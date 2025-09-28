import React from 'react';
import './VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <div className="vehicle-image">
        <img src={vehicle.images[0]} alt={vehicle.name} />
        {vehicle.isNew && <div className="new-badge">NEW</div>}
      </div>
      <div className="vehicle-details">
        <h3 className="vehicle-name">{vehicle.name}</h3>
        <p className="vehicle-brand">{vehicle.brand}</p>
        <div className="vehicle-price">₹{vehicle.price.toLocaleString()}</div>
        <p className="vehicle-description">{vehicle.description}</p>
        
        <div className="vehicle-specs">
          <div className="spec-item">
            <span className="spec-label">Engine</span>
            <span className="spec-value">{vehicle.specifications.engine}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Power</span>
            <span className="spec-value">{vehicle.specifications.power}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Mileage</span>
            <span className="spec-value">{vehicle.specifications.mileage}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Fuel Type</span>
            <span className="spec-value">{vehicle.specifications.fuelType}</span>
          </div>
        </div>
        
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default VehicleCard;