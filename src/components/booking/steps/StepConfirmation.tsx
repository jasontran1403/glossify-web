import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StepProps, ApiResponse, BookingCreatedResponse, StaffScheduleSlot } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepConfirmation: React.FC<StepProps> = ({ 
  bookingData, 
  updateBookingData, 
  prevStep, 
  isSubmitting, 
  setIsSubmitting 
}) => {
  const [error, setError] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(true);

  // ⭐ Debug: Component lifecycle
  useEffect(() => {
    console.log('\n🎯 StepConfirmation MOUNTED');
    console.log('   📊 Initial State:');
    console.log('      - isSubmitting:', isSubmitting);
    console.log('      - isValidating:', isValidating);
    console.log('      - bookingData:', bookingData);
    
    return () => {
      console.log('\n🎯 StepConfirmation UNMOUNTED');
    };
  }, []);

  // ⭐ Debug: State changes
  useEffect(() => {
    console.log('🔄 State Change: isSubmitting =', isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    console.log('🔄 State Change: isValidating =', isValidating);
  }, [isValidating]);

  useEffect(() => {
    if (error) console.log('❌ State Change: error =', error);
  }, [error]);

  useEffect(() => {
    if (validationError) console.log('⚠️ State Change: validationError =', validationError);
  }, [validationError]);

  // Validate availability on mount
  useEffect(() => {
    validateBookingAvailability();
  }, []);

  /**
   * Validate that selected time slots are still available
   */
  const validateBookingAvailability = async () => {
    console.log('\n🔍 VALIDATING BOOKING AVAILABILITY');
    console.log('   📅 Date:', bookingData.bookingDate);
    console.log('   ⏰ Time:', bookingData.bookingTime);
    console.log('   👥 Services:', bookingData.selectedServices.length);
    
    setIsValidating(true);
    setValidationError(null);

    try {
      // Get unique staff IDs
      const staffIds = [...new Set(bookingData.selectedServices.map(s => s.staffId))];
      console.log('   🔍 Checking staff:', staffIds);

      // Fetch schedules for all staff
      const schedulePromises = staffIds.map(staffId =>
        axios.get<ApiResponse<StaffScheduleSlot[]>>(
          `${API_BASE_URL}/user/schedule/${staffId}`,
          { params: { date: bookingData.bookingDate } }
        ).then(res => ({ staffId, slots: res.data.data || [] }))
      );

      const results = await Promise.all(schedulePromises);
      const schedulesMap: Record<number, StaffScheduleSlot[]> = {};
      results.forEach(({ staffId, slots }) => {
        schedulesMap[staffId] = slots;
        console.log(`   📋 Staff ${staffId} has ${slots.length} booked slots`);
      });

      // Check each service
      const [startHours, startMins] = bookingData.bookingTime.split(':').map(Number);
      
      for (const service of bookingData.selectedServices) {
        const offset = (service.order - 1) * 15;
        const totalMins = startHours * 60 + startMins + offset;
        const serviceTime = `${Math.floor(totalMins / 60).toString().padStart(2, '0')}:${(totalMins % 60).toString().padStart(2, '0')}`;
        
        const staffSlots = schedulesMap[service.staffId] || [];
        
        // ✅ FIXED: Check staffTimeSlots (same logic as StepDateTime)
        const conflictingBooking = staffSlots.find(slot => {
          const timeSlots = slot.staffTimeSlots && slot.staffTimeSlots.length > 0
            ? slot.staffTimeSlots
            : [{ startTime: slot.startTime, endTime: slot.endTime, serviceName: '', order: 0 }];
          
          return timeSlots.some(ts => ts.startTime === serviceTime);
        });

        console.log(`   🔎 Checking: ${service.staffName} @ ${serviceTime} - ${conflictingBooking ? '❌ BOOKED' : '✅ Available'}`);

        if (conflictingBooking) {
          const errorMsg = `${service.staffName} is not available at ${serviceTime} for ${service.serviceName}. This slot has been booked by another customer.`;
          console.log(`   ⚠️ CONFLICT FOUND: ${errorMsg}`);
          setValidationError(errorMsg);
          setIsValidating(false);
          return;
        }
      }

      console.log('   ✅ All slots are AVAILABLE');
      setIsValidating(false);
      
    } catch (err: any) {
      console.error('   ❌ Validation Error:', err);
      setValidationError('Failed to verify availability. Please try again.');
      setIsValidating(false);
    }
  };

  /**
   * Handle booking submission
   */
  const handleSubmit = async () => {
    console.log('\n🚀 CONFIRM BUTTON CLICKED');
    console.log('   Current State:');
    console.log('      - isSubmitting:', isSubmitting);
    console.log('      - isValidating:', isValidating);
    console.log('      - validationError:', validationError);

    if (isSubmitting) {
      console.log('   ⚠️ Already submitting, ignoring click');
      return;
    }

    if (isValidating) {
      console.log('   ⚠️ Still validating, ignoring click');
      return;
    }

    if (validationError) {
      console.log('   ⚠️ Validation error exists, ignoring click');
      return;
    }

    console.log('   ✅ Starting submission process');
    setIsSubmitting!(true);
    setError('');

    try {
      let customerId = bookingData.customerId;

      // Step 1: Create user account if needed
      if (bookingData.isNewCustomer) {
        console.log('\n📝 STEP 1: Creating new user account');
        console.log('   Phone:', bookingData.phoneNumber);
        console.log('   Name:', bookingData.fullName);
        console.log('   DOB:', bookingData.dateOfBirth);

        const registerResponse = await axios.post<ApiResponse<number>>(
          `${API_BASE_URL}/auth/register`,
          {
            phoneNumber: bookingData.phoneNumber,
            fullName: bookingData.fullName,
            username: bookingData.phoneNumber,
            dateOfBirth: bookingData.dateOfBirth || null,
          }
        );

        console.log('   Response:', registerResponse.data);

        if (registerResponse.data.code !== 900) {
          throw new Error(registerResponse.data.message || 'Failed to create account');
        }

        customerId = registerResponse.data.data;
        updateBookingData({ customerId });
        console.log('   ✅ Account created. Customer ID:', customerId);
      } else {
        console.log('\n📝 STEP 1: Using existing customer ID:', customerId);
      }

      // Step 2: Create booking
      console.log('\n📅 STEP 2: Creating booking');
      console.log('   Customer ID:', customerId);
      console.log('   Store ID:', bookingData.storeId);
      console.log('   DateTime:', `${bookingData.bookingDate}T${bookingData.bookingTime}`);
      console.log('   Services:', bookingData.selectedServices.length);

      const bookingPayload = {
        customerId: customerId,
        customerPhone: bookingData.phoneNumber,
        storeId: bookingData.storeId,
        startTime: `${bookingData.bookingDate}T${bookingData.bookingTime}:00`,
        selectedServices: bookingData.selectedServices.map(s => ({
          serviceId: s.serviceId,
          staffId: s.staffId,
          order: s.order,
        })),
      };

      console.log('   Payload:', bookingPayload);

      const bookingResponse = await axios.post<ApiResponse<BookingCreatedResponse>>(
        `${API_BASE_URL}/user/create`,
        bookingPayload
      );

      console.log('   Response:', bookingResponse.data);

      if (bookingResponse.data.code !== 900) {
        throw new Error(bookingResponse.data.message || 'Failed to create booking');
      }

      console.log('   ✅ Booking created. Booking ID:', bookingResponse.data.data.id);
      updateBookingData({ bookingId: bookingResponse.data.data.id });

      console.log('\n🎉 SUCCESS! Moving to success page');
      // Note: Parent component will handle navigation when bookingId is set
      
    } catch (err: any) {
      console.error('\n❌ ERROR during booking process:');
      console.error('   Type:', err.constructor.name);
      console.error('   Message:', err.message);
      console.error('   Response:', err.response?.data);
      console.error('   Full error:', err);

      const errorMsg = err.response?.data?.message || err.message || 'Failed to create booking';
      setError(errorMsg);
      
    } finally {
      console.log('\n🏁 Booking process FINISHED');
      console.log('   Setting isSubmitting = false');
      setIsSubmitting!(false);
    }
  };

  /**
   * Handle back button
   */
  const handleBack = () => {
    console.log('\n🔙 BACK BUTTON CLICKED');
    console.log('   Current isSubmitting:', isSubmitting);
    console.log('   Current isValidating:', isValidating);
    
    if (isSubmitting) {
      console.log('   ⚠️ Cannot go back - currently submitting');
      return;
    }
    
    console.log('   ✅ Going back to previous step');
    prevStep();
  };

  // Helper functions
  const getTotalPrice = () => bookingData.selectedServices.reduce((sum, s) => sum + s.price, 0);
  const getTotalDuration = () => bookingData.selectedServices.length * 15;
  
  const formatDate = () => {
    if (!bookingData.bookingDate) return '';
    const date = new Date(bookingData.bookingDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h4>Review Your Booking</h4>
        <p className="subtitle">Please confirm all details are correct</p>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="validation-error-banner">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="error-content">
            <h5>⚠️ Booking Conflict Detected</h5>
            <p className="error-main">{validationError}</p>
            <button className="change-time-btn" onClick={handleBack}>
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
            <span className="value">{bookingData.bookingTime}</span>
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
          onClick={handleBack}
          disabled={isSubmitting}
          style={{ 
            opacity: isSubmitting ? 0.5 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
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

      {/* Debug Panel (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f0f0f0', 
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          border: '2px solid #ddd'
        }}>
          <strong style={{ fontSize: '14px', display: 'block', marginBottom: '10px' }}>
            🐛 Debug Info:
          </strong>
          <div style={{ display: 'grid', gap: '5px' }}>
            <div>
              <strong>isSubmitting:</strong> 
              <span style={{ 
                marginLeft: '10px', 
                padding: '2px 8px', 
                background: isSubmitting ? '#ff6b6b' : '#51cf66',
                color: 'white',
                borderRadius: '4px'
              }}>
                {String(isSubmitting)}
              </span>
            </div>
            <div>
              <strong>isValidating:</strong> 
              <span style={{ 
                marginLeft: '10px', 
                padding: '2px 8px', 
                background: isValidating ? '#ffd43b' : '#51cf66',
                color: isValidating ? 'black' : 'white',
                borderRadius: '4px'
              }}>
                {String(isValidating)}
              </span>
            </div>
            <div>
              <strong>validationError:</strong> 
              <span style={{ 
                marginLeft: '10px', 
                padding: '2px 8px', 
                background: validationError ? '#ff6b6b' : '#51cf66',
                color: 'white',
                borderRadius: '4px'
              }}>
                {validationError ? 'YES' : 'NO'}
              </span>
            </div>
            <div>
              <strong>error:</strong> 
              <span style={{ 
                marginLeft: '10px', 
                padding: '2px 8px', 
                background: error ? '#ff6b6b' : '#51cf66',
                color: 'white',
                borderRadius: '4px'
              }}>
                {error ? 'YES' : 'NO'}
              </span>
            </div>
            <div style={{ marginTop: '5px', paddingTop: '5px', borderTop: '1px solid #ccc' }}>
              <strong>Back button disabled:</strong> {String(isSubmitting)}
            </div>
            <div>
              <strong>Confirm button disabled:</strong> {String(isSubmitting || isValidating || validationError !== null)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepConfirmation;