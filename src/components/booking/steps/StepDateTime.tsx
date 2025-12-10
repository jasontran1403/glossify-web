import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StepProps, TimeSlot, StaffScheduleSlot, ApiResponse } from '../types';
import { useToast } from '../Toast'; // ✅ Import useToast

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepDateTime: React.FC<StepProps> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  const toast = useToast(); // ✅ Initialize toast
  
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
      // ✅ Use toast instead of alert
      toast.error('Failed to load schedules. Please try again.');
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

      const hasBooking = checkSlotHasBooking(timeStr, schedulesMap);

      slots.push({
        time: timeStr,
        display: formatTimeDisplay(hours, mins),
        available: !hasBooking,
      });
    }

    setAvailableSlots(slots);
  };

  const checkSlotHasBooking = (slotTime: string, schedulesMap: Record<number, StaffScheduleSlot[]>): boolean => {
    const { selectedServices } = bookingData;
    const slotMinutes = timeToMinutes(slotTime);

    for (const service of selectedServices) {
      const staffSchedules = schedulesMap[service.staffId] || [];

      const allExistingIntervals = staffSchedules.flatMap(schedule => {
        if (schedule.staffTimeSlots && schedule.staffTimeSlots.length > 0) {
          return schedule.staffTimeSlots;
        } else {
          return [{ startTime: schedule.startTime, endTime: schedule.endTime }];
        }
      });

      const hasBookingAtSlot = allExistingIntervals.some(interval => {
        const intervalStart = timeToMinutes(interval.startTime);
        const intervalEnd = timeToMinutes(interval.endTime);
        return slotMinutes >= intervalStart && slotMinutes < intervalEnd;
      });

      if (hasBookingAtSlot) {
        return true;
      }
    }

    return false;
  };

  const validateBookingTime = (startTime: string, schedulesMap: Record<number, StaffScheduleSlot[]>): { valid: boolean; message?: string } => {
    const { selectedServices } = bookingData;
    const [startHours, startMins] = startTime.split(':').map(Number);

    for (let i = 0; i < selectedServices.length; i++) {
      const service = selectedServices[i];
      
      const serviceDuration = service.time || 15;
      const offset = selectedServices
        .slice(0, i)
        .reduce((sum, s) => sum + (s.time || 15), 0);

      const totalMins = startHours * 60 + startMins + offset;
      const serviceStartTime = minutesToTime(totalMins);
      const serviceStartMinutes = timeToMinutes(serviceStartTime);
      const serviceEndMinutes = serviceStartMinutes + serviceDuration;

      const staffSchedules = schedulesMap[service.staffId] || [];

      const allExistingIntervals = staffSchedules.flatMap(schedule => {
        if (schedule.staffTimeSlots && schedule.staffTimeSlots.length > 0) {
          return schedule.staffTimeSlots;
        } else {
          return [{ startTime: schedule.startTime, endTime: schedule.endTime }];
        }
      });

      const conflictingInterval = allExistingIntervals.find(existingSlot => {
        const e_start = timeToMinutes(existingSlot.startTime);
        const e_end = timeToMinutes(existingSlot.endTime);
        return serviceEndMinutes > e_start && e_end > serviceStartMinutes;
      });

      if (conflictingInterval) {
        return {
          valid: false,
          message: `${service.staffName} is not available during ${serviceStartTime}-${minutesToTime(serviceEndMinutes)}.\nThis time overlaps with an existing booking at ${conflictingInterval.startTime}-${conflictingInterval.endTime}.\nPlease select a different time or adjust your services.`
        };
      }
    }

    return { valid: true };
  };

  const formatTimeDisplay = (hours: number, mins: number): string => {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleTimeSelect = (time: string) => {
    const validation = validateBookingTime(time, schedules);
    
    if (!validation.valid) {
      // ✅ Use toast.error with longer duration for important messages
      toast.error(validation.message!, 7000);
      return;
    }

    setSelectedTime(time);
    updateBookingData({
      bookingDate: getLocalDateString(selectedDate!),
      bookingTime: time,
    });
    
    // ✅ Optional: Show success toast
    toast.success('Time selected successfully!', 3000);
  };

  const handleContinue = async () => {
    if (!selectedDate) {
      // ✅ Use toast.warning
      toast.warning('Please select a date');
      return;
    }
    if (!selectedTime) {
      // ✅ Use toast.warning
      toast.warning('Please select a time');
      return;
    }

    setIsValidatingContinue(true);

    try {
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

      const validation = validateBookingTime(selectedTime, schedulesMap);

      if (!validation.valid) {
        // ✅ Use toast.error
        toast.error(validation.message!, 7000);
        setIsValidatingContinue(false);
        fetchSchedulesForAllStaff();
        return;
      }

      const finalDateStr = getLocalDateString(selectedDate);
      updateBookingData({ bookingDate: finalDateStr });
      
      // ✅ Show success before moving to next step
      toast.success('Appointment time confirmed!', 2000);
      
      // Small delay to show toast before transitioning
      setTimeout(() => {
        nextStep();
      }, 300);

    } catch (error) {
      // ✅ Use toast.error
      toast.error('Failed to verify availability. Please try again.');
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
                  <span>Staff Busy</span>
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