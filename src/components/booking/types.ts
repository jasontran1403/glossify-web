// types.ts - Common TypeScript interfaces for Booking Flow

export interface BookingData {
  // Customer Info
  phoneNumber: string;
  fullName: string;
  dateOfBirth: string;
  customerId: number | null;
  isNewCustomer: boolean;
  time: number;
  
  // Store Selection
  storeId: number | null;
  storeName: string;
  
  // Service Selection
  selectedServices: SelectedService[];
  
  // Date & Time
  bookingDate: string | null;
  bookingTime: string;
  
  // Created Booking
  bookingId: number | null;
}

export interface SelectedService {
  serviceId: number;
  serviceName: string;
  staffId: number;
  staffName: string;
  price: number;
  order: number;
  time: number;
}

export interface StoreDTO {
  id: number;
  name: string;
  location: string;
  avt: string;
  lat?: number;
  lon?: number;
}

export interface CategoryDTO {
  id: number;
  name: string;
  description: string;
  avt: string;
  serviceCount: number;
}

export interface ServiceDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  avt: string;
  duration: number;
  plus: boolean;
}

export interface StaffDTO {
  id: number;
  fullName: string;
  avatar: string;
  rating: number;
  description: string;
  isAnyone: boolean;
}

export interface TimeSlot {
  time: string;
  display: string;
  available: boolean;
}

// ✅ NEW: Staff time slot (15 phút)
export interface StaffTimeSlot {
  startTime: string;  // "10:00"
  endTime: string;    // "10:15"
  serviceName: string;
  order: number;
}

// ✅ UPDATED: StaffScheduleSlot with staffTimeSlots
export interface StaffScheduleSlot {
  bookingId: number;
  fullName: string;
  customerAvt?: string;
  
  // ⚠️ DEPRECATED: Booking total time (not staff specific)
  // Keep for backward compatibility
  startTime: string;  // Booking start
  endTime: string;    // Booking end
  
  // ✅ NEW: Staff's actual time slots
  // Use this field to check availability!
  staffTimeSlots?: StaffTimeSlot[];  // Optional for backward compatibility
  
  services: number;
  serviceItems?: any[];
  status: string;
  totalAmount?: number;
  totalCashAmount?: number;
  discountCode?: string;
  amountDiscount?: number;
  discount?: number;
  tips?: number;
  paymentMethod?: string;
  cashDiscount?: number;
  reason?: string;
  allStaffIds?: number[];
  allStaffNames?: string[];
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  time: string;
}

export interface UserCheckResponse {
  exists: boolean;
  user: {
    id: number;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: string;
    avatar: string;
  } | null;
}

export interface BookingCreatedResponse {
  id: number;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  serviceCount: number;
  staffCount: number;
}

// Step Component Props
export interface StepProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (value: boolean) => void;
}