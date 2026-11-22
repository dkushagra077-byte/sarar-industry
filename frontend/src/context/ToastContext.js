import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 380,
        width: '100%'
      }}>
        {toasts.map(toast => {
          let bg = '#0b1d33';
          let border = '#334155';
          if (toast.type === 'success') { bg = '#15803d'; border = '#166534'; }
          if (toast.type === 'error') { bg = '#b91c1c'; border = '#991b1b'; }
          if (toast.type === 'warning') { bg = '#b45309'; border = '#92400e'; }

          return (
            <div
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              style={{
                backgroundColor: bg,
                border: `1px solid ${border}`,
                color: '#ffffff',
                padding: '12px 18px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                animation: 'slideIn 0.25s ease'
              }}
            >
              <span>{toast.message}</span>
              <span style={{ marginLeft: 12, opacity: 0.8, fontSize: '1.1rem' }}>&times;</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
