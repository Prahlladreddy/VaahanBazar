import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import FilterPanel from '../components/FilterPanel';
import { useNavigate } from 'react-router-dom';
import './NewBikes.css';

// Using the same mockVehicles data as Home
const mockVehicles = [
  {
    _id: '1',
    name: 'Activa 6G',
    brand: 'Honda',
    model: 'Activa',
    price: 75000,
    images: ['https://images.unsplash.com/photo-1558981285-6f0c949b2f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    specifications: {
      engine: '109.51 cc',
      power: '7.79 PS',
      torque: '8.79 Nm',
      mileage: '60 kmpl',
      fuelType: 'Petrol',
      transmission: 'Automatic'
    },
    description: 'The Honda Activa 6G is a popular scooter known for its reliability and comfort.',
    isNew: true
  },
  {
    _id: '2',
    name: 'Splendor Plus',
    brand: 'Hero',
    model: 'Splendor',
    price: 65000,
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    specifications: {
      engine: '97.2 cc',
      power: '7.9 PS',
      torque: '8.05 Nm',
      mileage: '80 kmpl',
      fuelType: 'Petrol',
      transmission: '4-speed'
    },
    description: 'Hero Splendor Plus is one of the best-selling motorcycles in India.',
    isNew: true
  },
  {
    _id: '3',
    name: 'Apache RTR 160',
    brand: 'TVS',
    model: 'Apache',
    price: 105000,
    images: ['https://images.unsplash.com/photo-1609599006983-e5457e8c4f32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    specifications: {
      engine: '159.7 cc',
      power: '15.31 PS',
      torque: '13.9 Nm',
      mileage: '45 kmpl',
      fuelType: 'Petrol',
      transmission: '5-speed'
    },
    description: 'TVS Apache RTR 160 is a performance-oriented motorcycle with sporty looks.',
    isNew: true
  },
  {
    _id: '4',
    name: 'Classic 350',
    brand: 'Royal Enfield',
    model: 'Classic',
    price: 185000,
    images: ['https://images.unsplash.com/photo-1558981806-ecb6df8d9c9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    specifications: {
      engine: '346 cc',
      power: '19.1 PS',
      torque: '28 Nm',
      mileage: '35 kmpl',
      fuelType: 'Petrol',
      transmission: '5-speed'
    },
    description: 'Royal Enfield Classic 350 is a retro-styled motorcycle with modern features.',
    isNew: true
  },
  {
    _id: '5',
    name: 'Ather 450X',
    brand: 'Ather',
    model: '450X',
    price: 140000,
    images: ['https://images.unsplash.com/photo-1627555370858-6347109f10a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    specifications: {
      engine: 'Electric',
      power: '6 kW',
      torque: '26 Nm',
      mileage: '85 km/charge',
      fuelType: 'Electric',
      transmission: 'Automatic'
    },
    description: 'Ather 450X is a premium electric scooter with smart features.',
    isNew: true
  },
  {
    _id: '6',
    name: 'Pulsar NS200',
    brand: 'Bajaj',
    model: 'Pulsar',
    price: 135000,
    images: ['https://images.unsplash.com/photo-1609599006983-e5457e8c4f32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    specifications: {
      engine: '199.5 cc',
      power: '24.13 PS',
      torque: '18.74 Nm',
      mileage: '35 kmpl',
      fuelType: 'Petrol',
      transmission: '6-speed'
    },
    description: 'Bajaj Pulsar NS200 is a naked street motorcycle with aggressive styling.',
    isNew: true
  }
];

const NewBikes = ({ isAuthenticated, user, logout }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    isNew: true, // Default to show only new bikes
    page: 1,
    limit: 6
  });
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let mounted = true;

    const timer = setTimeout(() => {
      // apply filters
      const minPriceNum = filters.minPrice ? Number(filters.minPrice) : null;
      const maxPriceNum = filters.maxPrice ? Number(filters.maxPrice) : null;
      const pageNum = Number(filters.page) || 1;
      const limitNum = Number(filters.limit) || 6;

      const filtered = mockVehicles.filter((v) => {
        if (filters.brand && v.brand !== filters.brand) return false;
        if (filters.fuelType && v.specifications?.fuelType !== filters.fuelType) return false;
        if (filters.isNew !== '') {
          const wantNew = String(filters.isNew) === 'true';
          if (v.isNew !== wantNew) return false;
        }
        if (minPriceNum !== null && v.price < minPriceNum) return false;
        if (maxPriceNum !== null && v.price > maxPriceNum) return false;
        return true;
      });

      const total = Math.ceil(filtered.length / limitNum) || 1;
      const start = (pageNum - 1) * limitNum;
      const paginated = filtered.slice(start, start + limitNum);

      if (mounted) {
        setVehicles(paginated);
        setTotalPages(total);
        setLoading(false);
      }
    }, 600);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="new-bikes-container">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">New Two-Wheelers</h1>
            <p className="page-subtitle">Discover the latest models from top brands</p>
          </div>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="new-bikes-content">
        {/* Filter Panel */}
        <div className="filter-section">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Vehicle Listings */}
        <div className="vehicles-section">
          {loading ? (
            <div className="loading-container">
              <div className="spinner" />
              <p>Loading vehicles...</p>
            </div>
          ) : (
            <>
              <div className="vehicles-grid">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                  ))
                ) : (
                  <p>No new vehicles found for the selected filters.</p>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePageChange(i + 1)}
                      className={`page-btn ${Number(filters.page) === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewBikes;