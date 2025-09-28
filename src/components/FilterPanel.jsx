import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleReset = () => {
    onFilterChange({
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      isNew: ''
    });
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-title">Filters</h3>
      
      <div className="filter-group">
        <label className="filter-label">Brand</label>
        <select
          className="filter-select"
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
        >
          <option value="">All Brands</option>
          <option value="Honda">Honda</option>
          <option value="Hero">Hero</option>
          <option value="TVS">TVS</option>
          <option value="Royal Enfield">Royal Enfield</option>
          <option value="Ather">Ather</option>
          <option value="Bajaj">Bajaj</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            className="filter-input"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
          <input
            type="number"
            className="filter-input"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Fuel Type</label>
        <select
          className="filter-select"
          name="fuelType"
          value={filters.fuelType}
          onChange={handleInputChange}
        >
          <option value="">All Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Condition</label>
        <div className="filter-checkbox">
          <input
            type="radio"
            name="isNew"
            value=""
            checked={filters.isNew === ''}
            onChange={handleInputChange}
          />
          <label>All</label>
        </div>
        <div className="filter-checkbox">
          <input
            type="radio"
            name="isNew"
            value="true"
            checked={filters.isNew === 'true'}
            onChange={handleInputChange}
          />
          <label>New</label>
        </div>
        <div className="filter-checkbox">
          <input
            type="radio"
            name="isNew"
            value="false"
            checked={filters.isNew === 'false'}
            onChange={handleInputChange}
          />
          <label>Used</label>
        </div>
      </div>
      
      <button className="reset-btn" onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default FilterPanel;