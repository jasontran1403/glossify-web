import React, { useState } from 'react';
import './BookingFlow.css';
import StepCustomerInfo from './steps/StepCustomerInfo';
import StepStoreSelection from './steps/StepStoreSelection';
import StepServiceSelection from './steps/StepServiceSelection';
import StepDateTime from './steps/StepDateTime';
import StepConfirmation from './steps/StepConfirmation';
import StepSuccess from './steps/StepSuccess';
import { BookingData } from './types';

interface Step {
  id: number;
  title: string;
  component: React.ComponentType<any>;
}

const STEPS: Step[] = [
  { id: 1, title: 'Customer Info', component: StepCustomerInfo },
  { id: 2, title: 'Select Store', component: StepStoreSelection },
  { id: 3, title: 'Select Services', component: StepServiceSelection },
  { id: 4, title: 'Date & Time', component: StepDateTime },
  { id: 5, title: 'Confirmation', component: StepConfirmation },
];

const BookingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    // Customer Info
    phoneNumber: '',
    fullName: '',
    dateOfBirth: '',
    customerId: null,
    isNewCustomer: false,
    
    // Store Selection
    storeId: null,
    storeName: '',
    
    // Service Selection
    selectedServices: [],
    
    // Date & Time
    bookingDate: null,
    bookingTime: '',
    
    // Created Booking
    bookingId: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    if (bookingData.bookingId) {
      return (
        <StepSuccess 
          bookingData={bookingData}
          onNewBooking={() => {
            setBookingData({
              phoneNumber: '',
              fullName: '',
              dateOfBirth: '',
              customerId: null,
              isNewCustomer: false,
              storeId: null,
              storeName: '',
              selectedServices: [],
              bookingDate: null,
              bookingTime: '',
              bookingId: null,
            });
            setCurrentStep(1);
          }}
        />
      );
    }

    const StepComponent = STEPS[currentStep - 1].component;
    
    return (
      <StepComponent
        bookingData={bookingData}
        updateBookingData={updateBookingData}
        nextStep={nextStep}
        prevStep={prevStep}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    );
  };

  return (
    <section className="booking-flow-section">
      <div className="container">
        {/* Progress Steps */}
        {!bookingData.bookingId && (
          <div className="booking-steps-progress aos-init" data-aos-delay="600" data-aos="fade-up">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`step-item ${currentStep >= step.id ? 'active' : ''} ${
                  currentStep === step.id ? 'current' : ''
                }`}
              >
                <div className="step-number">{step.id}</div>
                <div className="step-title">{step.title}</div>
                {index < STEPS.length - 1 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div className="booking-step-content aos-init" data-aos-delay="700" data-aos="fade-up">
          {renderStep()}
        </div>
      </div>
    </section>
  );
};

export default BookingFlow;