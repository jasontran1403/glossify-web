import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StepProps, TimeSlot, StaffScheduleSlot, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepDateTime: React.FC<StepProps> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    bookingData.bookingDate ? new Date(bookingData.bookingDate + 'T00:00:00') : today
  );
  const [schedules, setSchedules] = useState<Record<number, StaffScheduleSlot[]>>({});
  const [loadingSchedules, setLoadingSchedules] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>(bookingData.bookingTime || '');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isValidatingContinue, setIsValidatingContinue] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(schedules).length > 0) {
      console.log('📊 Current schedules:', schedules);
    }
  }, [schedules]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedTime('');
      updateBookingData({ bookingTime: '' });
      fetchSchedulesForAllStaff();
    }
  }, [selectedDate]);

  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

      setSchedules(schedulesMap);
      calculateAvailableSlots(schedulesMap);
    } catch (error) {
      alert('Failed to load schedules');
    } finally {
      setLoadingSchedules(false);
    }
  };

  const calculateAvailableSlots = (schedulesMap: Record<number, StaffScheduleSlot[]>): void => {
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
   * ✅ FIXED: Check if a time slot is available for booking
   * 
   * Uses TRUE overlap check (>) to ALLOW touching boundaries:
   * - newEnd can equal existingStart (no overlap)
   * - newEnd > existingStart means TRUE overlap
   * 
   * Example:
   * - Booking: 09:30 - 10:46
   * - Slot 09:15 with 15min service: 09:15 - 09:30
   *   → newEnd (09:30) > existingStart (09:30)? NO → AVAILABLE ✅
   * - Slot 09:30 with 15min service: 09:30 - 09:45
   *   → newEnd (09:45) > existingStart (09:30)? YES → NOT AVAILABLE ❌
   */
  const checkSlotAvailability = (startTime: string, schedulesMap: Record<number, StaffScheduleSlot[]>): boolean => {
    const { selectedServices } = bookingData;

    for (let i = 0; i < selectedServices.length; i++) {
      const service = selectedServices[i];

      // Calculate service time based on actual duration
      const serviceDuration = service.time || 15; // Use actual service time
      const offset = selectedServices
        .slice(0, i)
        .reduce((sum, s) => sum + (s.time || 15), 0);

      const [hours, mins] = startTime.split(':').map(Number);
      const totalMins = hours * 60 + mins + offset;
      const serviceStartTime = minutesToTime(totalMins);
      const serviceStartMinutes = timeToMinutes(serviceStartTime);
      const serviceEndMinutes = serviceStartMinutes + serviceDuration;

      // Get staff's booked schedules
      const staffSchedules = schedulesMap[service.staffId] || [];
      
      // Collect all existing intervals for this staff
      const allExistingIntervals = staffSchedules.flatMap(schedule => {
        if (schedule.staffTimeSlots && schedule.staffTimeSlots.length > 0) {
          return schedule.staffTimeSlots;
        } else {
          // Fallback to whole booking slot
          return [{ startTime: schedule.startTime, endTime: schedule.endTime, serviceName: '', order: 0 }];
        }
      });

      // ✅ FIXED: Check for TRUE overlap (use > not >=)
      // Allow touching: newEnd can equal existingStart
      const hasConflict = allExistingIntervals.some(existingSlot => {
        const e_start = timeToMinutes(existingSlot.startTime);
        const e_end = timeToMinutes(existingSlot.endTime);

        // TRUE overlap: newEnd > existingStart AND existingEnd > newStart
        const overlaps = serviceEndMinutes > e_start && e_end > serviceStartMinutes;

        return overlaps;
      });

      if (hasConflict) {
        return false;
      }
    }

    return true;
  };

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

  const handleContinue = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    if (!selectedTime) {
      alert('Please select a time');
      return;
    }

    setIsValidatingContinue(true);

    try {
      // Re-fetch schedules to check for race conditions
      const staffIds = [...new Set(bookingData.selectedServices.map(s => s.staffId))];
      const dateStr = getLocalDateString(selectedDate);

      const schedulePromises = staffIds.map(staffId =>
        axios.get<ApiResponse<StaffScheduleSlot[]>>(
          `${API_BASE_URL}/user/schedule/${staffId}`,
          { params: { date: dateStr } }
        ).then(res => ({ staffId, slots: res.data.data || [] }))
      );

      const results = await Promise.all(schedulePromises);
      const schedulesMap: Record<number, StaffScheduleSlot[]> = {};
      results.forEach(({ staffId, slots }) => {
        schedulesMap[staffId] = slots;
      });

      // Validate each service with TRUE overlap check
      const [startHours, startMins] = selectedTime.split(':').map(Number);

      for (let i = 0; i < bookingData.selectedServices.length; i++) {
        const service = bookingData.selectedServices[i];
        
        // Calculate service time based on actual duration
        const serviceDuration = service.time || 15;
        const offset = bookingData.selectedServices
          .slice(0, i)
          .reduce((sum, s) => sum + (s.time || 15), 0);

        const totalMins = startHours * 60 + startMins + offset;
        const serviceStartTime = minutesToTime(totalMins);
        const serviceStartMinutes = timeToMinutes(serviceStartTime);
        const serviceEndMinutes = serviceStartMinutes + serviceDuration;

        const staffSchedules = schedulesMap[service.staffId] || [];

        // Collect all existing intervals
        const allExistingIntervals = staffSchedules.flatMap(schedule => {
          if (schedule.staffTimeSlots && schedule.staffTimeSlots.length > 0) {
            return schedule.staffTimeSlots;
          } else {
            return [{ startTime: schedule.startTime, endTime: schedule.endTime, serviceName: '', order: 0 }];
          }
        });

        // ✅ FIXED: Use TRUE overlap check (> not >=)
        const hasConflict = allExistingIntervals.some(existingSlot => {
          const e_start = timeToMinutes(existingSlot.startTime);
          const e_end = timeToMinutes(existingSlot.endTime);
          // TRUE overlap: newEnd > existingStart AND existingEnd > newStart
          return serviceEndMinutes > e_start && e_end > serviceStartMinutes;
        });

        if (hasConflict) {
          alert(`Sorry, ${service.staffName} is no longer available during ${serviceStartTime}-${minutesToTime(serviceEndMinutes)}.\n\nThis time overlaps with an existing booking.\n\nPlease select a different time.`);
          
          setIsValidatingContinue(false);
          // Re-calculate available slots to show updated availability
          fetchSchedulesForAllStaff();
          return;
        }
      }

      // All good, proceed to next step
      const finalDateStr = getLocalDateString(selectedDate);
      updateBookingData({ bookingDate: finalDateStr });
      nextStep();

    } catch (error) {
      alert('Failed to verify availability. Please try again.');
      setIsValidatingContinue(false);
    }
  };

  const morningSlots = availableSlots.filter(slot => {
    const [hours, mins] = slot.time.split(':').map(Number);
    const totalMins = hours * 60 + mins;
    return totalMins <= 11 * 60 + 45;
  });

  const afternoonSlots = availableSlots.filter(slot => {
    const [hours, mins] = slot.time.split(':').map(Number);
    const totalMins = hours * 60 + mins;
    return totalMins >= 12 * 60;
  });

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  // ✅ Calculate actual total duration from selected services
  const totalDuration = bookingData.selectedServices.reduce((sum, service) => {
    return sum + (service.time || 15);
  }, 0);

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

      <div className="weekday-header">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <span key={day} className="weekday">
            {day.substring(0, 3)}
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
            renderCustomHeader={renderCustomHeader}
            showWeekNumbers={false}
          />
        </div>

        {selectedDate && (
          <div className="time-slots-section">
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

            <div className="time-slots-content">
              {loadingSchedules ? (
                <div className="loading-inline">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Loading available times...</span>
                </div>
              ) : (
                <>
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
                            className={`time-slot ${!slot.available ? 'disabled' : ''} ${selectedTime === slot.time ? 'selected' : ''
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
                            className={`time-slot ${!slot.available ? 'disabled' : ''} ${selectedTime === slot.time ? 'selected' : ''
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
            {/* ✅ FIXED: Show actual total duration */}
            <small>Duration: {totalDuration} minutes</small>
          </div>
        </div>
      )}

      <div className="step-navigation">
        <button
          type="button"
          className="wiondefault-btn submit-btn"
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
          disabled={!selectedDate || !selectedTime || isValidatingContinue}
        >
          {isValidatingContinue ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Validating...
            </>
          ) : (
            <>
              Continue
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

export default StepDateTime;