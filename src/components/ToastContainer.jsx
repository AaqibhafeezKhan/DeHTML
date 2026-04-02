import React from 'react';
import { useToast } from '../context/ToastContext';

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 1000,
    }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          backgroundColor: toast.type === 'success' ? 'var(--success-color-light)' : 
                           toast.type === 'error' ? 'var(--error-color-light)' : 'var(--foreground-color)',
          border: '1px solid',
          borderColor: toast.type === 'success' ? 'var(--success-color-light)' : 
                       toast.type === 'error' ? 'var(--error-color-light)' : 'var(--border-color)',
          borderLeft: '5px solid ' + (toast.type === 'success' ? 'var(--success-color)' : 
                  toast.type === 'error' ? 'var(--error-color)' : 'var(--border-color)'),
          color: toast.type === 'success' ? 'var(--success-color)' : 
                 toast.type === 'error' ? 'var(--error-color)' : 'var(--text-color-dark)',
          padding: '1.1rem 1.5rem',
          borderRadius: 'var(--border-radius-base)',
          animation: 'toast-in 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '500',
          boxShadow: 'var(--box-shadow-small)'
        }}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
