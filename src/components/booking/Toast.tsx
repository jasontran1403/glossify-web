import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import './Toast.css';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  isClosing?: boolean;
}

interface ToastContextType {
  showToast: (type: Toast['type'], message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: Toast['type'], message: string, duration: number = 5000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, type, message, duration, isClosing: false };

    // Add to beginning of array (newest on top)
    setToasts(prev => [newToast, ...prev]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = (id: string) => {
    // Mark as closing to trigger animation
    setToasts(prev => prev.map(t => t.id === id ? { ...t, isClosing: true } : t));
    
    // Remove after animation completes (300ms)
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  };

  const success = useCallback((message: string, duration?: number) => {
    showToast('success', message, duration);
  }, [showToast]);

  const error = useCallback((message: string, duration?: number) => {
    showToast('error', message, duration);
  }, [showToast]);

  const warning = useCallback((message: string, duration?: number) => {
    showToast('warning', message, duration);
  }, [showToast]);

  const info = useCallback((message: string, duration?: number) => {
    showToast('info', message, duration);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <div 
        className="toast-container"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 999999,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px'
        }}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    const duration = toast.duration;
    const startTime = startTimeRef.current;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      
      setProgress(remaining);

      if (remaining > 0) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [toast.duration]);

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return { bg: '#10b981', border: '#059669', light: '#d1fae5' };
      case 'error':
        return { bg: '#ef4444', border: '#dc2626', light: '#fee2e2' };
      case 'warning':
        return { bg: '#f59e0b', border: '#d97706', light: '#fef3c7' };
      case 'info':
        return { bg: '#3b82f6', border: '#2563eb', light: '#dbeafe' };
      default:
        return { bg: '#6b7280', border: '#4b5563', light: '#f3f4f6' };
    }
  };

  const colors = getColors();

  const getIcon = () => {
    const iconStyle = { width: '24px', height: '24px' };
    
    switch (toast.type) {
      case 'success':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" style={iconStyle}>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`toast-item ${toast.isClosing ? 'toast-closing' : ''}`}
      onClick={onClose} // Click anywhere on toast to close
      style={{
        pointerEvents: 'auto',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        minWidth: '300px',
        maxWidth: '400px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateX(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
    >
      {/* Content */}
      <div style={{ 
        padding: '16px',
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '12px' 
      }}>
        <div style={{ 
          color: colors.bg,
          flexShrink: 0
        }}>
          {getIcon()}
        </div>
        <div style={{ 
          flex: 1,
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#1f2937',
          wordBreak: 'break-word',
          whiteSpace: 'pre-line',
          fontWeight: '500'
        }}>
          {toast.message}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent toast click when clicking X
            onClose();
          }}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            color: '#9ca3af',
            flexShrink: 0,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#6b7280';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px' }}>
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <div 
          style={{
            height: '4px',
            background: colors.light,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              height: '100%',
              background: colors.bg,
              width: `${progress}%`,
              transition: 'width 0.1s linear',
              boxShadow: `0 0 10px ${colors.bg}`
            }}
          />
        </div>
      )}
    </div>
  );
};