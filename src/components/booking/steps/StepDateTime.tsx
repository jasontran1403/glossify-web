import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StepProps, TimeSlot, StaffScheduleSlot, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepDateTime: React.FC<StepProps> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  // ← FIX: Default to today if no prior date (triggers auto-load and highlights today in calendar)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day for consistency
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    bookingData.bookingDate ? new Date(bookingData.bookingDate + 'T00:00:00') : today
  );
  // ← FIX: Correct destructuring - add 'schedules' state variable
  const [schedules, setSchedules] = useState<Record<number, StaffScheduleSlot[]>>({});
  const [loadingSchedules, setLoadingSchedules] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>(bookingData.bookingTime || '');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDate) {
      // Reset selected time when date changes
      setSelectedTime('');
      updateBookingData({ bookingTime: '' });

      // Fetch schedules for new date
      fetchSchedulesForAllStaff();
    }
  }, [selectedDate]);

  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchSchedulesForAllStaff = async () => {
    if (!selectedDate) return;

    setLoadingSchedules(true);
    const dateStr = getLocalDateString(selectedDate);

    try {
      const staffIds = [...new Set(bookingData.selectedServices.map(s => s.staffId))];

      const schedulePromises = staffIds.map(async (staffId) => {
        const response = await axios.get<ApiResponse<StaffScheduleSlot[]>>(
          `${API_BASE_URL}/user/schedule/${staffId}`,
          { params: { date: dateStr } }
        );

        // Server returns list of BOOKED slots
        // Empty list = staff completely free
        if (response.data.code === 900) {
          return { staffId, slots: response.data.data || [] };
        }
        return { staffId, slots: [] };
      });

      const results = await Promise.all(schedulePromises);

      const schedulesMap: Record<number, StaffScheduleSlot[]> = {};
      results.forEach(({ staffId, slots }) => {
        schedulesMap[staffId] = slots;
      });

      setSchedules(schedulesMap);  // ← Now 'setSchedules' is the setter function
      calculateAvailableSlots(schedulesMap);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      alert('Failed to load schedules');
    } finally {
      setLoadingSchedules(false);
    }
  };

  const calculateAvailableSlots = (schedulesMap: Record<number, StaffScheduleSlot[]>) => {
    const slots: TimeSlot[] = [];
    const start = 9 * 60;  // 9:00 AM
    const end = 17 * 60;   // 5:00 PM

    for (let minutes = start; minutes < end; minutes += 15) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

      const isAvailable = checkSlotAvailability(timeStr, schedulesMap);

      slots.push({
        time: timeStr,
        display: formatTimeDisplay(hours, mins),
        available: isAvailable,
      });
    }

    setAvailableSlots(slots);
  };

  /**
   * Check if a time slot is available for booking
   * 
   * LOGIC:
   * - Server returns list of BOOKED slots only
   * - Empty list [] = Staff completely free = All slots AVAILABLE
   * - Has data = Those slots are BLOCKED
   * 
   * To book successfully:
   * - For each service, calculate actual time (startTime + offset)
   * - Check if that time EXISTS in staff's booked slots
   * - If EXISTS in response → BLOCKED (already booked)
   * - If NOT EXISTS in response → AVAILABLE (can book)
   */
  const checkSlotAvailability = (startTime: string, schedulesMap: Record<number, StaffScheduleSlot[]>): boolean => {
    const { selectedServices } = bookingData;

    // Check all services in the booking
    for (let i = 0; i < selectedServices.length; i++) {
      const service = selectedServices[i];

      // Calculate actual service time based on order
      const offset = (service.order - 1) * 15;
      const [hours, mins] = startTime.split(':').map(Number);
      const totalMins = hours * 60 + mins + offset;
      const serviceHours = Math.floor(totalMins / 60);
      const serviceMins = totalMins % 60;
      const serviceTime = `${serviceHours.toString().padStart(2, '0')}:${serviceMins.toString().padStart(2, '0')}`;

      // Get staff's booked slots (những giờ ĐÃ BOOKED)
      const staffBookedSlots = schedulesMap[service.staffId] || [];

      // Check if this service time is in the BOOKED list
      const isSlotBooked = staffBookedSlots.some(slot => slot.startTime === serviceTime);

      // If slot is in booked list → CANNOT book
      if (isSlotBooked) {
        return false;
      }
    }

    // All services can be scheduled → slot is AVAILABLE
    return true;
  };

  /**
   * Format time display - No AM/PM, just 24-hour format
   * 9:00, 9:15, ... 16:45
   */
  const formatTimeDisplay = (hours: number, mins: number): string => {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateBookingData({
      bookingDate: getLocalDateString(selectedDate!),
      bookingTime: time,
    });
  };

  const handleContinue = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    if (!selectedTime) {
      alert('Please select a time');
      return;
    }
    const finalDateStr = getLocalDateString(selectedDate);
    console.log('Final date to backend:', finalDateStr);  // Debug log
    updateBookingData({ bookingDate: finalDateStr });  // Ensure it's updated
    nextStep();
  };

  // Split slots into Morning and Afternoon
  const morningSlots = availableSlots.filter(slot => {
    const [hours, mins] = slot.time.split(':').map(Number);
    const totalMins = hours * 60 + mins;
    return totalMins <= 11 * 60 + 45; // <= 11:45
  });

  const afternoonSlots = availableSlots.filter(slot => {
    const [hours, mins] = slot.time.split(':').map(Number);
    const totalMins = hours * 60 + mins;
    return totalMins >= 12 * 60; // >= 12:00
  });

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0); // Normalize minDate to start of today
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  // ← NEW: Custom header to display weekday names explicitly in the calendar header
  // This ensures the weekday row is visible and customizable (e.g., full names)
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => (
    <div className="custom-datepicker-header">
      {/* Navigation bar with month/year */}
      <div className="header-nav">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="nav-button prev"
        >
          {'<'}
        </button>
        <span className="month-year">
          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="nav-button next"
        >
          {'>'}
        </button>
      </div>

      {/* Weekday header row - full names for clarity */}
      <div className="weekday-header">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <span key={day} className="weekday">
            {day.substring(0, 3)} {/* Abbreviated, or use full: {day} */}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h4>Select Date & Time</h4>
        <p className="subtitle">Choose when you'd like your appointment</p>
      </div>

      <div className="datetime-selector">
        <div className="date-picker-section">
          <h5>Select Date</h5>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            inline
            calendarClassName="custom-calendar"
            // ← NEW: Custom header to explicitly show weekday names in header
            renderCustomHeader={renderCustomHeader}
            showWeekNumbers={false} // Optional: Hide week numbers to focus on weekdays
          />
        </div>

        {selectedDate && (
          <div className="time-slots-section">
            {/* Fixed Header */}
            <div className="time-slots-header">
              <h5>Select Time</h5>

              <div className="time-slots-legend">
                <div className="legend-item">
                  <span className="legend-box available"></span>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <span className="legend-box selected"></span>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <span className="legend-box disabled"></span>
                  <span>Not Available</span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="time-slots-content">
              {loadingSchedules ? (
                <div className="loading-inline">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Loading available times...</span>
                </div>
              ) : (
                <>
                  {/* Morning Section */}
                  {morningSlots.length > 0 && (
                    <div className="time-section">
                      <div className="time-section-header">
                        <i className="fas fa-sun"></i>
                        <span>Morning</span>
                      </div>
                      <div className="time-slots-grid">
                        {morningSlots.map((slot) => (
                          <button
                            key={slot.time}
                            className={`time-slot ${!slot.available ? 'disabled' : ''} ${
                              selectedTime === slot.time ? 'selected' : ''
                            }`}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Afternoon Section */}
                  {afternoonSlots.length > 0 && (
                    <div className="time-section">
                      <div className="time-section-header">
                        <i className="fas fa-cloud-sun"></i>
                        <span>Afternoon</span>
                      </div>
                      <div className="time-slots-grid">
                        {afternoonSlots.map((slot) => (
                          <button
                            key={slot.time}
                            className={`time-slot ${!slot.available ? 'disabled' : ''} ${
                              selectedTime === slot.time ? 'selected' : ''
                            }`}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedDate && selectedTime && (
        <div className="selected-datetime-display">
          <i className="fas fa-calendar-check"></i>
          <div>
            <strong>Your Appointment:</strong>
            <p>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              {' at '}
              {selectedTime}
            </p>
            <small>Duration: {bookingData.selectedServices.length * 15} minutes</small>
          </div>
        </div>
      )}

      <div className="step-navigation">
        <button 
          type="button" 
          className="wiondefault-btn outline-btn"
          onClick={prevStep}
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
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          Continue to Confirmation
          <span className="wionbutton-icon">
            <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
            <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default StepDateTime;