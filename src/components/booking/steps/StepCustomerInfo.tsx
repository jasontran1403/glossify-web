import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import axios, { AxiosError } from 'axios';
import { StepProps, ApiResponse, UserCheckResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Phone formatting utility
const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.substring(0, 10);
  
  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
};

const getRawPhone = (formatted: string): string => {
  return formatted.replace(/\D/g, '');
};

const toDBFormat = (rawPhone: string): string => {
  return `+1${rawPhone}`;
};

interface FormErrors {
  phone?: string;
  fullName?: string;
  dateOfBirth?: string;
}

const StepCustomerInfo: React.FC<StepProps> = ({ bookingData, updateBookingData, nextStep }) => {
  const [phoneDisplay, setPhoneDisplay] = useState<string>('');
  const [fullName, setFullName] = useState<string>(bookingData.fullName || '');
  const [dateOfBirth, setDateOfBirth] = useState<string>(bookingData.dateOfBirth || '');
  
  const [isCheckingPhone, setIsCheckingPhone] = useState<boolean>(false);
  const [existingUser, setExistingUser] = useState<UserCheckResponse['user'] | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showUserFields, setShowUserFields] = useState<boolean>(false);

  // Check if user exists by phone
  const checkUserByPhone = useCallback(
    debounce(async (rawPhone: string) => {
      if (rawPhone.length !== 10) {
        setExistingUser(null);
        setShowUserFields(false);
        return;
      }

      setIsCheckingPhone(true);
      try {
        const dbPhone = toDBFormat(rawPhone);
        const response = await axios.get<ApiResponse<UserCheckResponse>>(
          `${API_BASE_URL}/user/check-phone`,
          { params: { phone: dbPhone } }
        );

        if (response.data.data.exists && response.data.data.user) {
          setExistingUser(response.data.data.user);
          setFullName(response.data.data.user.fullName);
          setDateOfBirth(response.data.data.user.dateOfBirth || '');
          setShowUserFields(false);
          
          updateBookingData({
            customerId: response.data.data.user.id,
            fullName: response.data.data.user.fullName,
            dateOfBirth: response.data.data.user.dateOfBirth || '',
            phoneNumber: dbPhone,
            isNewCustomer: false,
          });
        } else {
          setExistingUser(null);
          setShowUserFields(true);
          setFullName('');
          setDateOfBirth('');
          
          updateBookingData({
            customerId: null,
            isNewCustomer: true,
            phoneNumber: dbPhone,
          });
        }
      } catch (error) {
        console.error('Error checking phone:', error);
        setExistingUser(null);
        setShowUserFields(true);
      } finally {
        setIsCheckingPhone(false);
      }
    }, 800),
    [updateBookingData]
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneDisplay(formatted);
    
    const raw = getRawPhone(formatted);
    checkUserByPhone(raw);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    
    const capitalized = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    updateBookingData({ fullName: capitalized });
  };

  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    
    setDateOfBirth(value);
    updateBookingData({ dateOfBirth: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const rawPhone = getRawPhone(phoneDisplay);

    if (rawPhone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (showUserFields || !existingUser) {
      if (!fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (dateOfBirth) {
        const dobRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        if (!dobRegex.test(dateOfBirth)) {
          newErrors.dateOfBirth = 'Date of birth must be in MM/DD/YYYY format';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h4>Let's start with your information</h4>
        <p className="subtitle">Enter your phone number to continue</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Phone Number */}
        <div className="row">
          <div className="col-lg-12">
            <div className="wionmain-field">
              <h6>Phone Number *</h6>
              <div className="phone-input-wrapper">
                <span className="phone-prefix">+1</span>
                <input
                  type="text"
                  placeholder="(970) 710-1062"
                  value={phoneDisplay}
                  onChange={handlePhoneChange}
                  className={errors.phone ? 'error' : ''}
                />
                {isCheckingPhone && (
                  <span className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                  </span>
                )}
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>
        </div>

        {/* Existing User Message */}
        {existingUser && (
          <div className="existing-user-message">
            <i className="fas fa-check-circle"></i>
            <span>Welcome back, <strong>{existingUser.fullName}</strong>!</span>
          </div>
        )}

        {/* New User Fields */}
        {showUserFields && (
          <div className="new-user-fields animate-in">
            <div className="info-message">
              <i className="fas fa-info-circle"></i>
              <span>We'll create an account for you to track your appointments</span>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="wionmain-field">
                  <h6>Full Name *</h6>
                  <input
                    type="text"
                    placeholder="David Coperfield"
                    value={fullName}
                    onChange={handleNameChange}
                    className={errors.fullName ? 'error' : ''}
                    autoFocus
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="wionmain-field">
                  <h6>Date of Birth (Optional)</h6>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={dateOfBirth}
                    onChange={handleDOBChange}
                    maxLength={10}
                    className={errors.dateOfBirth ? 'error' : ''}
                  />
                  <small className="field-hint">Enter your birthday to receive special discounts!</small>
                  {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="step-navigation">
          <a 
            href="/" 
            className="wiondefault-btn submit-btn"
          >
            Back To Home
          </a>
          <button 
            type="submit" 
            className="wiondefault-btn submit-btn"
            disabled={isCheckingPhone}
          >
            Continue to Store Selection
            <span className="wionbutton-icon">
              <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
              <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepCustomerInfo;