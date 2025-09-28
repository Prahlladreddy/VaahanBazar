// src/components/ComparisonTable.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ComparisonTable.css';

const ComparisonTable = ({ vehicles }) => {
  const comparisonSpecs = [
    { label: 'Name', key: 'name' },
    { label: 'Brand', key: 'brand' },
    { label: 'Model', key: 'model' },
    { label: 'Price', key: 'price', format: (value) => `₹${value.toLocaleString()}` },
    { label: 'Condition', key: 'isNew', format: (value) => value ? 'New' : 'Used' },
    { label: 'Engine', key: 'specifications.engine' },
    { label: 'Power', key: 'specifications.power' },
    { label: 'Torque', key: 'specifications.torque' },
    { label: 'Mileage', key: 'specifications.mileage' },
    { label: 'Fuel Type', key: 'specifications.fuelType' },
    { label: 'Transmission', key: 'specifications.transmission' }
  ];

  const getValue = (obj, key) => {
    if (key.includes('.')) {
      const keys = key.split('.');
      return keys.reduce((o, k) => (o || {})[k], obj);
    }
    return obj[key];
  };

  return (
    <div className="comparison-table-container">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="spec-header">Specification</th>
            {vehicles.map(vehicle => (
              <th key={vehicle._id} className="vehicle-header">
                <div className="vehicle-header-content">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <img 
                      src={vehicle.images[0]} 
                      alt={vehicle.name} 
                      className="vehicle-header-image"
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                  <div className="vehicle-header-info">
                    <div className="vehicle-name">{vehicle.name}</div>
                    <div className="vehicle-price">₹{vehicle.price.toLocaleString()}</div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonSpecs.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td className="spec-cell">{spec.label}</td>
              {vehicles.map(vehicle => (
                <td key={`${vehicle._id}-${index}`} className="value-cell">
                  {spec.format 
                    ? spec.format(getValue(vehicle, spec.key))
                    : getValue(vehicle, spec.key) || '-'
                  }
                </td>
              ))}
            </tr>
          ))}
          <tr className="actions-row">
            <td className="spec-cell">Actions</td>
            {vehicles.map(vehicle => (
              <td key={`action-${vehicle._id}`} className="value-cell">
                <div className="action-buttons">
                  <Link to={`/vehicles/${vehicle._id}`} className="view-details-btn">
                    View Details
                  </Link>
                  <button className="test-drive-btn">
                    Book Test Drive
                  </button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;