import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress ResizeObserver loop errors that trigger full-screen error overlays during resizing
if (typeof window !== "undefined") {
  const isResizeObserverError = (msg: string) => {
    return (
      msg &&
      (msg.includes("ResizeObserver loop limit exceeded") ||
        msg.includes("ResizeObserver loop completed with undelivered notifications"))
    );
  };

  window.addEventListener("error", (e) => {
    if (e.message && isResizeObserverError(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason && e.reason.message && isResizeObserverError(e.reason.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

