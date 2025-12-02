import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StepProps, ApiResponse, BookingCreatedResponse, StaffScheduleSlot } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

interface ValidationError {
  staffName: string;
  serviceName: string;
  conflictTime: string;
  message: string;
}

const StepConfirmation: React.FC<StepProps> = ({ 
  bookingData, 
  updateBookingData, 
  prevStep, 
  isSubmitting, 
  setIsSubmitting 
}) => {
  const [error, setError] = useState<string>('');
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(true);

  // Validate booking availability when component mounts
  useEffect(() => {
    validateBookingAvailability();
  }, []);

  /**
   * Validate that all selected time slots are still available
   * This prevents race conditions where slots become unavailable
   * between selection and confirmation
   */
  const validateBookingAvailability = async () => {
    setIsValidating(true);
    setValidationError(null);

    try {
      const staffIds = [...new Set(bookingData.selectedServices.map(s => s.staffId))];
      const dateStr = bookingData.bookingDate;

      // Fetch current schedules for all staff
      const schedulePromises = staffIds.map(async (staffId) => {
        const response = await axios.get<ApiResponse<StaffScheduleSlot[]>>(
          `${API_BASE_URL}/user/schedule/${staffId}`,
          { params: { date: dateStr } }
        );
        return { 
          staffId, 
          slots: response.data.data || [] 
        };
      });

      const results = await Promise.all(schedulePromises);
      
      // Build schedules map
      const schedulesMap: Record<number, StaffScheduleSlot[]> = {};
      results.forEach(({ staffId, slots }) => {
        schedulesMap[staffId] = slots;
      });

      // Check availability for each service
      const startTime = bookingData.bookingTime;
      const [startHours, startMins] = startTime.split(':').map(Number);
      
      for (const service of bookingData.selectedServices) {
        // Calculate actual service time based on order
        const offset = (service.order - 1) * 15;
        const totalMins = startHours * 60 + startMins + offset;
        const serviceHours = Math.floor(totalMins / 60);
        const serviceMins = totalMins % 60;
        const serviceTime = `${serviceHours.toString().padStart(2, '0')}:${serviceMins.toString().padStart(2, '0')}`;

        // Get staff's booked slots
        const staffBookedSlots = schedulesMap[service.staffId] || [];
        
        // Check if this time slot is booked
        const isBooked = staffBookedSlots.some(slot => slot.startTime === serviceTime);

        if (isBooked) {
          // Found conflict - set error and stop
          setValidationError({
            staffName: service.staffName,
            serviceName: service.serviceName,
            conflictTime: serviceTime,
            message: `${service.staffName} is not available at ${serviceTime} for ${service.serviceName}. This time slot has been booked by another customer.`
          });
          setIsValidating(false);
          return;
        }
      }

      // All slots are available
      console.log('✅ All time slots are available');
      setIsValidating(false);
    } catch (err: any) {
      console.error('Error validating booking availability:', err);
      setValidationError({
        staffName: 'Unknown',
        serviceName: '',
        conflictTime: '',
        message: 'Failed to verify availability. Please try again or select a different time.'
      });
      setIsValidating(false);
    }
  };

  const createUserAccount = async (): Promise<number | null> => {
    try {
      const registerPayload = {
        phoneNumber: bookingData.phoneNumber,
        fullName: bookingData.fullName,
        username: bookingData.phoneNumber,
        dateOfBirth: bookingData.dateOfBirth || null,
      };

      console.log('Creating new user account:', registerPayload);

      const response = await axios.post<ApiResponse<number>>(
        `${API_BASE_URL}/auth/register`,
        registerPayload
      );

      if (response.data.code === 900) {
        const newCustomerId = response.data.data;
        console.log('✅ User account created. Customer ID:', newCustomerId);
        return newCustomerId;
      } else {
        console.error('Failed to create user account:', response.data.message);
        setError('Failed to create user account: ' + response.data.message);
        return null;
      }
    } catch (err: any) {
      console.error('Error creating user account:', err);
      setError('Error creating user account: ' + (err.response?.data?.message || err.message));
      return null;
    }
  };

  const createBooking = async (customerId: number): Promise<void> => {
    try {
      const dateTimeStr = `${bookingData.bookingDate}T${bookingData.bookingTime}:00`;

      const bookingPayload = {
        customerId: customerId,
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
        console.log('✅ Booking created successfully:', response.data.data);
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
      let customerId = bookingData.customerId;

      // Step 1: Create user account if new customer
      if (bookingData.isNewCustomer) {
        const newCustomerId = await createUserAccount();
        
        if (!newCustomerId) {
          setIsSubmitting!(false);
          return;
        }
        
        customerId = newCustomerId;
        updateBookingData({ customerId: newCustomerId });
      }

      // Step 2: Create booking with correct customerId
      if (customerId) {
        await createBooking(customerId);
      } else {
        setError('Customer ID is missing. Please try again.');
        setIsSubmitting!(false);
      }
      
    } catch (err: any) {
      console.error('Error in booking process:', err);
      setError('An unexpected error occurred. Please try again.');
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
    return bookingData.bookingTime;
  };

  return (
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h4>Review Your Booking</h4>
        <p className="subtitle">Please confirm all details are correct</p>
      </div>

      {/* Validation Error Banner - Shows conflict with staff */}
      {validationError && (
        <div className="validation-error-banner">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="error-content">
            <h5>⚠️ Booking Conflict Detected</h5>
            <p className="error-main">{validationError.message}</p>
            <div className="conflict-details">
              <div className="conflict-item">
                <strong>Staff:</strong> {validationError.staffName}
              </div>
              {validationError.serviceName && (
                <div className="conflict-item">
                  <strong>Service:</strong> {validationError.serviceName}
                </div>
              )}
              {validationError.conflictTime && (
                <div className="conflict-item">
                  <strong>Conflict Time:</strong> {validationError.conflictTime}
                </div>
              )}
            </div>
            <button 
              className="change-time-btn"
              onClick={prevStep}
            >
              <i className="fas fa-arrow-left"></i>
              Change Date/Time
            </button>
          </div>
        </div>
      )}

      {/* Regular Error Banner */}
      {error && !validationError && (
        <div className="error-banner">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Validating State */}
      {isValidating && (
        <div className="validating-banner">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Verifying availability...</span>
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
            <li className="highlight">Your account will be created automatically</li>
          )}
          <li>Cancellations must be made at least 24 hours in advance</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="step-navigation">
        <button 
          type="button" 
          className="wiondefault-btn submit-btn"
          onClick={prevStep}
          disabled={isSubmitting || isValidating}
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
          disabled={isSubmitting || isValidating || validationError !== null}
        >
          {isValidating ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Verifying...
            </>
          ) : isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Processing...
            </>
          ) : (
            <>
              Confirm
              <span className="wionbutton-icon">
                <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
                <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
              </span>
            </>
          )}
        </button>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          background: '#f0f0f0', 
          borderRadius: '5px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <strong>Debug Info:</strong>
          <div>isSubmitting: {String(isSubmitting)}</div>
          <div>Back button disabled: {String(isSubmitting)}</div>
          <div>Confirm button disabled: {String(isSubmitting)}</div>
        </div>
      )}
    </div>
  );
};

export default StepConfirmation;