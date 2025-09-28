// src/components/TestDriveForm.jsx
import React, { useState, useMemo } from 'react';
import './TestDriveForm.css';

const TestDriveForm = ({ vehicleId = '' }) => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'success' | 'error' | ''

  // compute min date once (safe for SSR)
  const minDate = useMemo(() => {
    try {
      if (typeof window === 'undefined') return '';
      return new Date().toISOString().split('T')[0];
    } catch {
      return '';
    }
  }, []);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setStatus('');

    // keep this as a promise chain to avoid build/parsing edge-cases in some environments
    new Promise((resolve) => setTimeout(resolve, 1000))
      .then(() => {
        const successMsg = vehicleId
          ? `Test drive for vehicle ${vehicleId} booked successfully!`
          : 'Test drive booked successfully!';

        setMessage(successMsg);
        setStatus('success');
        setDate('');
        setTimeSlot('');
        setShowForm(false);
      })
      .catch(() => {
        setMessage('Failed to book test drive');
        setStatus('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button
        onClick={() => setShowForm((s) => !s)}
        className="test-drive-btn"
        type="button"
      >
        Book Test Drive
      </button>

      {showForm && (
        <div className="test-drive-form">
          <h3 className="form-title">Book a Test Drive</h3>

          {message && (
            <div className={`form-message ${status}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={minDate || undefined}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestDriveForm;
