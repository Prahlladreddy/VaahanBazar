// src/components/AddToComparison.jsx
import React, { useState, useEffect } from 'react';
import './AddToComparison.css';

const AddToComparison = ({ vehicleId }) => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  
  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('compareVehicles');
    if (saved) {
      setSelectedVehicles(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('compareVehicles', JSON.stringify(selectedVehicles));
  }, [selectedVehicles]);
  
  const handleAddToCompare = () => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId));
    } else if (selectedVehicles.length < 4) {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    }
  };
  
  const isSelected = selectedVehicles.includes(vehicleId);
  const isMaxSelected = selectedVehicles.length >= 4 && !isSelected;
  
  return (
    <div className="add-to-comparison">
      <button 
        onClick={handleAddToCompare}
        disabled={isMaxSelected}
        className={`compare-btn ${isSelected ? 'selected' : ''} ${isMaxSelected ? 'disabled' : ''}`}
      >
        {isSelected ? 'Remove from Comparison' : 'Add to Comparison'}
      </button>
      
      {selectedVehicles.length > 0 && (
        <div className="compare-status">
          <span>{selectedVehicles.length}/4 selected</span>
          {selectedVehicles.length >= 2 && (
            <a href="/compare" className="compare-link">Compare Now</a>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToComparison;