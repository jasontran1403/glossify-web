import React, { useState } from 'react';
import axios from 'axios';
import { StepProps, ApiResponse, BookingCreatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepConfirmation: React.FC<StepProps> = ({ 
  bookingData, 
  updateBookingData, 
  prevStep, 
  isSubmitting, 
  setIsSubmitting 
}) => {
  const [error, setError] = useState<string>('');

  const createUserAccount = async (): Promise<boolean> => {
    try {
      const registerPayload = {
        phoneNumber: bookingData.phoneNumber,
        fullName: bookingData.fullName,
        username: bookingData.phoneNumber,
        dateOfBirth: bookingData.dateOfBirth || null,
      };

      console.log('Creating new user account:', registerPayload);
      console.log(`NEW USER CREATED: Phone: ${bookingData.phoneNumber}, Name: ${bookingData.fullName}`);

      const response = await axios.post<ApiResponse<any>>(
        `${API_BASE_URL}/auth/register`,
        registerPayload
      );

      if (response.data.code === 900) {
        console.log('User account created successfully');
        return true;
      } else {
        console.error('Failed to create user account:', response.data.message);
        setError('Failed to create user account: ' + response.data.message);
        return false;
      }
    } catch (err: any) {
      console.error('Error creating user account:', err);
      setError('Error creating user account: ' + (err.response?.data?.message || err.message));
      return false;
    }
  };

  const createBooking = async (): Promise<void> => {
    try {
      const dateTimeStr = `${bookingData.bookingDate}T${bookingData.bookingTime}:00`;

      const bookingPayload = {
        customerId: bookingData.customerId,
        customerPhone: bookingData.phoneNumber,
        storeId: bookingData.storeId,
        startTime: dateTimeStr,
        selectedServices: bookingData.selectedServices.map(service => ({
          serviceId: service.serviceId,
          staffId: service.staffId,
          order: service.order,
        })),
      };

      console.log('Creating booking:', bookingPayload);

      const response = await axios.post<ApiResponse<BookingCreatedResponse>>(
        `${API_BASE_URL}/user/create`,
        bookingPayload
      );

      if (response.data.code === 900) {
        console.log('Booking created successfully:', response.data.data);
        updateBookingData({ bookingId: response.data.data.id });
      } else {
        setError('Failed to create booking: ' + response.data.message);
      }
    } catch (err: any) {
      console.error('Error creating booking:', err);
      
      let errorMessage = 'Failed to create booking. Please try again.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting!(true);
    setError('');

    try {
      // Step 1: Create user account if new customer
      if (bookingData.isNewCustomer) {
        const password = generatePassword(6);
        const userCreated = await createUserAccount(password);
        
        if (!userCreated) {
          setIsSubmitting!(false);
          return;
        }
      }

      // Step 2: Create booking
      await createBooking();
      
    } catch (err: any) {
      console.error('Error in booking process:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting!(false);
    }
  };

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
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h4>Review Your Booking</h4>
        <p className="subtitle">Please confirm all details are correct</p>
      </div>

      {error && (
        <div className="error-banner">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Customer Information */}
      <div className="confirmation-section">
        <h5 className="section-title">
          <i className="fas fa-user"></i>
          Customer Information
        </h5>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{bookingData.fullName}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{bookingData.phoneNumber}</span>
          </div>
          {bookingData.dateOfBirth && (
            <div className="info-item">
              <span className="label">Date of Birth:</span>
              <span className="value">{bookingData.dateOfBirth}</span>
            </div>
          )}
          {bookingData.isNewCustomer && (
            <div className="info-badge new-customer">
              <i className="fas fa-star"></i>
              New Customer - Account will be created
            </div>
          )}
        </div>
      </div>

      {/* Store Information */}
      <div className="confirmation-section">
        <h5 className="section-title">
          <i className="fas fa-store"></i>
          Location
        </h5>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Store:</span>
            <span className="value">{bookingData.storeName}</span>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="confirmation-section">
        <h5 className="section-title">
          <i className="fas fa-calendar-alt"></i>
          Appointment Details
        </h5>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Date:</span>
            <span className="value">{formatDate()}</span>
          </div>
          <div className="info-item">
            <span className="label">Time:</span>
            <span className="value">{formatTime()}</span>
          </div>
          <div className="info-item">
            <span className="label">Duration:</span>
            <span className="value">{getTotalDuration()} minutes</span>
          </div>
        </div>
      </div>

      {/* Selected Services */}
      <div className="confirmation-section">
        <h5 className="section-title">
          <i className="fas fa-list"></i>
          Selected Services
        </h5>
        <div className="services-list-confirm">
          {bookingData.selectedServices.map((service, index) => (
            <div key={index} className="service-confirm-item">
              <div className="service-order">{service.order}</div>
              <div className="service-details">
                <strong>{service.serviceName}</strong>
                <small>with {service.staffName}</small>
              </div>
              <div className="service-price">${service.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="total-price-confirm">
          <span>Total Price:</span>
          <strong>${getTotalPrice().toFixed(2)}</strong>
        </div>
      </div>

      {/* Important Notes */}
      <div className="confirmation-notes">
        <h6><i className="fas fa-info-circle"></i> Important Notes:</h6>
        <ul>
          <li>Please arrive 5 minutes before your appointment</li>
          <li>You will receive an SMS confirmation shortly</li>
          {bookingData.isNewCustomer && (
            <li className="highlight">A temporary password will be sent to your phone number</li>
          )}
          <li>Cancellations must be made at least 24 hours in advance</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="step-navigation">
        <button 
          type="button" 
          className="wiondefault-btn outline-btn"
          onClick={prevStep}
          disabled={isSubmitting}
        >
          <span className="wionbutton-icon left">
            <img className="arry1" src="/assets/images/svg/arrow-left.png" alt="" />
            <img className="arry2" src="/assets/images/svg/arrow-left.png" alt="" />
          </span>
          Back
        </button>

        <button 
          type="button" 
          className="wiondefault-btn submit-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Processing...
            </>
          ) : (
            <>
              Confirm Booking
              <span className="wionbutton-icon">
                <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
                <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepConfirmation;