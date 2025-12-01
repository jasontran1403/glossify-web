import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StepProps, CategoryDTO, ServiceDTO, StaffDTO, ApiResponse, SelectedService } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const StepServiceSelection: React.FC<StepProps> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(bookingData.selectedServices || []);
  
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<ServiceDTO | null>(null);
  const [availableStaff, setAvailableStaff] = useState<StaffDTO[]>([]);
  const [loadingStaff, setLoadingStaff] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<ApiResponse<CategoryDTO[]>>(`${API_BASE_URL}/user/categories`, {
        params: { storeId: bookingData.storeId }
      });
      
      if (response.data.code === 900) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchServices = async (categoryId: number) => {
    setLoadingServices(true);
    try {
      const response = await axios.get<ApiResponse<ServiceDTO[]>>(`${API_BASE_URL}/user/services`, {
        params: { categoryId }
      });
      
      if (response.data.code === 900) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to load services');
    } finally {
      setLoadingServices(false);
    }
  };

  const handleCategorySelect = (category: CategoryDTO) => {
    setSelectedCategory(category.id);
    fetchServices(category.id);
  };

  const handleServiceClick = async (service: ServiceDTO) => {
    const existing = selectedServices.find(s => s.serviceId === service.id);
    if (existing) {
      setSelectedServices(prev => prev.filter(s => s.serviceId !== service.id)
        .map((s, idx) => ({ ...s, order: idx + 1 }))
      );
      return;
    }

    if (selectedServices.length >= 6) {
      alert('Maximum 6 services per booking');
      return;
    }

    setCurrentService(service);
    setShowStaffModal(true);
    await fetchAvailableStaff(service.id);
  };

  const fetchAvailableStaff = async (serviceId: number) => {
    setLoadingStaff(true);
    try {
      const response = await axios.get<ApiResponse<StaffDTO[]>>(
        `${API_BASE_URL}/user/services/${serviceId}/staff`,
        { params: { storeId: bookingData.storeId } }
      );
      
      if (response.data.code === 900) {
        setAvailableStaff(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      alert('Failed to load staff');
    } finally {
      setLoadingStaff(false);
    }
  };

  const handleStaffSelect = (staff: StaffDTO) => {
    if (!currentService) return;

    const newService: SelectedService = {
      serviceId: currentService.id,
      serviceName: currentService.name,
      staffId: staff.id,
      staffName: staff.fullName,
      price: currentService.price,
      order: selectedServices.length + 1,
    };

    setSelectedServices(prev => [...prev, newService]);
    setShowStaffModal(false);
    setCurrentService(null);
    setAvailableStaff([]);
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    const uniqueStaffIds = new Set(selectedServices.map(s => s.staffId));
    if (uniqueStaffIds.size > 3) {
      alert('Maximum 3 different staff per booking');
      return;
    }

    updateBookingData({ selectedServices });
    nextStep();
  };

  const getTotalPrice = (): number => {
    return selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
  };

  const getTotalDuration = (): number => {
    return selectedServices.length * 15;
  };

  if (loadingCategories) {
    return (
      <div className="wioncontact-box">
        <div className="loading-container">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wioncontact-box">
      <div className="wioncontact-title">
        <h4>Choose Your Services</h4>
        <p className="subtitle">Select up to 6 services (max 3 different staff)</p>
      </div>

      {/* Categories */}
      <div className="categories-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category.name}
            <span className="service-count">({category.serviceCount})</span>
          </button>
        ))}
      </div>

      {/* Services */}
      {selectedCategory && (
        <div className="services-list">
          {loadingServices ? (
            <div className="loading-inline">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Loading services...</span>
            </div>
          ) : (
            services.map((service) => {
              const isSelected = selectedServices.some(s => s.serviceId === service.id);
              
              return (
                <div
                  key={service.id}
                  className={`service-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="service-image">
                    <img src={service.avt || '/assets/images/default-service.jpg'} alt={service.name} />
                    {service.plus && <span className="plus-badge">PLUS</span>}
                  </div>
                  <div className="service-info">
                    <h5>{service.name}</h5>
                    <p className="service-desc">{service.description}</p>
                    <div className="service-meta">
                      <span className="price">${service.price}</span>
                      <span className="duration">{service.duration} min</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="selected-check">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Selected Services Summary */}
      {selectedServices.length > 0 && (
        <div className="selected-services-summary">
          <h5>Selected Services ({selectedServices.length}/6)</h5>
          <div className="summary-list">
            {selectedServices.map((service, index) => (
              <div key={index} className="summary-item">
                <span className="order-number">{service.order}</span>
                <div className="summary-info">
                  <strong>{service.serviceName}</strong>
                  <small>with {service.staffName}</small>
                </div>
                <span className="summary-price">${service.price}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <div className="total-line">
              <span>Total Duration:</span>
              <strong>{getTotalDuration()} minutes</strong>
            </div>
            <div className="total-line">
              <span>Estimated Total:</span>
              <strong>${getTotalPrice().toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Staff Selection Modal */}
      {showStaffModal && (
        <div className="modal-overlay" onClick={() => setShowStaffModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Select Staff for {currentService?.name}</h4>
              <button className="modal-close" onClick={() => setShowStaffModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {loadingStaff ? (
                <div className="loading-container">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Loading available staff...</p>
                </div>
              ) : (
                <div className="staff-list">
                  {availableStaff.map((staff) => (
                    <div
                      key={staff.id}
                      className="staff-item"
                      onClick={() => handleStaffSelect(staff)}
                    >
                      <div className="staff-avatar">
                        <img src={staff.avatar || 'https://www.namecard.online/tracy.png'} alt={staff.fullName} />
                      </div>
                      <div className="staff-info">
                        <h5>{staff.fullName}</h5>
                        {staff.description && <p>{staff.description}</p>}
                        <div className="staff-rating">
                          <i className="fas fa-star"></i>
                          <span>{staff.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                        {staff.isAnyone && (
                          <span className="anyone-badge">Any Available</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
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
          disabled={selectedServices.length === 0}
        >
          Continue to Date & Time
          <span className="wionbutton-icon">
            <img className="arry1" src="/assets/images/svg/arrow-right.png" alt="" />
            <img className="arry2" src="/assets/images/svg/arrow-right.png" alt="" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default StepServiceSelection;