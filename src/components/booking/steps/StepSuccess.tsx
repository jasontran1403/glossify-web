import React from 'react';
import { BookingData } from '../types';

interface StepSuccessProps {
  bookingData: BookingData;
  onNewBooking: () => void;
}

const StepSuccess: React.FC<StepSuccessProps> = ({ bookingData, onNewBooking }) => {
  const getTotalPrice = (): number => {
    return bookingData.selectedServices.reduce((sum, s) => sum + s.price, 0);
  };

  const getTotalDuration = (): number => {
    return bookingData.selectedServices.length * 15;
  };

  const formatDate = (): string => {
    if (!bookingData.bookingDate) return '';
    const date = new Date(bookingData.bookingDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (): string => {
    if (!bookingData.bookingTime) return '';
    const [hours, mins] = bookingData.bookingTime.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="success-container">
      {/* Success Animation */}
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>

      {/* Success Message */}
      <div className="success-message">
        <h2>Booking Confirmed! 🎉</h2>
        <p className="confirmation-number">
          Confirmation #{bookingData.bookingId}
        </p>
        <p className="success-subtitle">
          Your appointment has been successfully scheduled
        </p>
      </div>

      {/* Booking Summary Card */}
      <div className="booking-summary-card">
        <div className="summary-header">
          <i className="fas fa-calendar-check"></i>
          <h4>Appointment Details</h4>
        </div>

        <div className="summary-content">
          {/* Date & Time */}
          <div className="summary-row">
            <div className="summary-info">
              <span className="summary-label">Date & Time</span>
              <strong>{formatDate()}</strong>
              <span>{formatTime()} ({getTotalDuration()} minutes)</span>
            </div>
          </div>

          {/* Location */}
          <div className="summary-row">
            
            <div className="summary-info">
              <span className="summary-label">Location</span>
              <strong>{bookingData.storeName}</strong>
            </div>
          </div>

          {/* Customer */}
          <div className="summary-row">
            
            <div className="summary-info">
              <span className="summary-label">Customer</span>
              <strong>{bookingData.fullName}</strong>
              <span>{bookingData.phoneNumber}</span>
            </div>
          </div>

          {/* Services */}
          <div className="summary-row services-row">
            <div className="summary-info full-width">
              <span className="summary-label">Services ({bookingData.selectedServices.length})</span>
              <div className="services-list-success">
                {bookingData.selectedServices.map((service, index) => (
                  <div key={index} className="service-success-item">
                    <div className="service-details-success">
                      <strong>{service.serviceName} ${service.price.toFixed(2)}</strong>
                      <small>with {service.staffName}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total-price-success">
                <span>Total:</span>
                <strong>${getTotalPrice().toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Account Notice */}
      {bookingData.isNewCustomer && (
        <div className="new-account-notice">
          <i className="fas fa-user-plus"></i>
          <div>
            <strong>New Account Created!</strong>
            <p>A temporary password has been sent to your phone number. Please check your SMS to login and manage your appointments.</p>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="next-steps">
        <h5>What's Next?</h5>
        <div className="steps-grid">
          <div className="step-item-success">
            <div className="step-icon-success">
              <i className="fas fa-envelope"></i>
            </div>
            <h6>Check Your Phone</h6>
            <p>You'll receive an SMS confirmation shortly</p>
          </div>
          <div className="step-item-success">
            <div className="step-icon-success">
              <i className="fas fa-clock"></i>
            </div>
            <h6>Arrive Early</h6>
            <p>Please arrive 5 minutes before your appointment</p>
          </div>
          <div className="step-item-success">
            <div className="step-icon-success">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h6>Bring Your Phone</h6>
            <p>Show your confirmation number at check-in</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="success-actions">
        <button 
          type="button" 
          className="wiondefault-btn outline-btn"
          onClick={() => window.location.href = '/'}
        >
          <span className="wionbutton-icon left">
            <img className="arry1" src="/assets/images/svg/arrow-left.png" alt="" />
            <img className="arry2" src="/assets/images/svg/arrow-left.png" alt="" />
          </span>
          Back to Home
        </button>

        <button 
          type="button" 
          className="wiondefault-btn submit-btn"
          onClick={onNewBooking}
        >
          Book Another Appointment
          <span className="wionbutton-icon">
            <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
            <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
          </span>
        </button>
      </div>

      {/* Contact Support */}
      <div className="support-notice">
        <p>
          Need to make changes? Contact us at{' '}
          <a href="tel:+1234567890">+1 (234) 567-890</a>
          {' or '}
          <a href="mailto:support@nailsalon.com">support@nailsalon.com</a>
        </p>
      </div>
    </div>
  );
};

export default StepSuccess;