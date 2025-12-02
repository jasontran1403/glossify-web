import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StepProps, StoreDTO, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepStoreSelection: React.FC<StepProps> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  const [stores, setStores] = useState<StoreDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStore, setSelectedStore] = useState<number | null>(bookingData.storeId);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get<ApiResponse<StoreDTO[]>>(`${API_BASE_URL}/user/stores`);
      
      if (response.data.code === 900) {
        setStores(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      alert('Failed to load stores. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStoreSelect = (store: StoreDTO) => {
    setSelectedStore(store.id);
    updateBookingData({
      storeId: store.id,
      storeName: store.name,
      selectedServices: [],
      bookingDate: null,
      bookingTime: '',
    });
  };

  const handleContinue = () => {
    if (!selectedStore) {
      alert('Please select a store to continue');
      return;
    }
    nextStep();
  };

  if (loading) {
    return (
      <div className="wioncontact-box">
        <div className="loading-container">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
          <p>Loading stores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h3 className="mb-2">Select Your Preferred Location</h3>
        <p className="subtitle">Choose the salon you'd like to visit</p>
      </div>

      <div className="stores-grid">
        {stores.map((store) => (
          <div
            key={store.id}
            className={`store-card ${selectedStore === store.id ? 'selected' : ''}`}
            onClick={() => handleStoreSelect(store)}
          >
            <div className="store-image">
              <img src={store.avt || '/assets/images/default-store.jpg'} alt={store.name} />
            </div>
            <div className="store-info">
              <h5>{store.name}</h5>
              <p className="store-location">
                <i className="fas fa-map-marker-alt"></i>
                {store.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
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
          disabled={!selectedStore}
        >
          Continue
          <span className="wionbutton-icon">
            <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
            <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
          </span>
        </button>
        
      </div>
    </div>
  );
};

export default StepStoreSelection;