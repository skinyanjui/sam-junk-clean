
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import SimpleTestPage from './components/SimpleTestPage.tsx'
import SafeApp from './SafeApp.tsx'
import './index.css'

console.log('Main.tsx starting');

// Check if we're in a working environment
if (typeof window !== 'undefined') {
  console.log('Window object available');
  console.log('Location:', window.location.href);
  console.log('React available:', typeof React);
}

const container = document.getElementById("root");
if (!container) {
  console.error('Failed to find root element');
  throw new Error('Failed to find the root element');
}

console.log('Creating React root');
const root = createRoot(container);

// Try rendering with fallbacks
const initializeApp = async () => {
  try {
    console.log('Attempting to render application');
    
    // Safe mode: render minimal app when ?safe=1
    const params = new URLSearchParams(window.location.search);
    const safeMode = params.get('safe') === '1';
    if (safeMode) {
      console.log('Safe mode enabled via query param');
      root.render(<SafeApp />);
      console.log('SafeApp rendered successfully');
      return;
    }
    
    // Try to import i18n but don't fail if it doesn't work
    try {
      await import('./i18n');
      console.log('i18n loaded successfully');
    } catch (i18nError) {
      console.warn('i18n failed to load:', i18nError);
    }
    
    root.render(<App />);
    console.log('App component rendered successfully');
  } catch (appError) {
    console.error('Error rendering main App:', appError);
    console.log('Attempting to render fallback test page');
    
    try {
      root.render(<SimpleTestPage />);
      console.log('Fallback test page rendered successfully');
    } catch (fallbackError) {
      console.error('Even fallback failed:', fallbackError);
      
      // Last resort: render basic HTML
      container.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
          <h1 style="color: #B22234;">Uncle Sam Junk Removal</h1>
          <p>Application is experiencing technical difficulties.</p>
          <button onclick="window.location.reload()" style="
            background: #B22234; 
            color: white; 
            padding: 10px 20px; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer;
          ">Refresh Page</button>
        </div>
      `;
    }
  }
};

// Initialize the app
initializeApp().catch((error) => {
  console.error('Failed to initialize app:', error);
  // Last resort fallback
  const container = document.getElementById("root");
  if (container) {
    container.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <h1 style="color: #B22234;">Uncle Sam Junk Removal</h1>
        <p>Critical error loading application.</p>
        <button onclick="window.location.reload()" style="
          background: #B22234; 
          color: white; 
          padding: 10px 20px; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
        ">Refresh Page</button>
      </div>
    `;
  }
});
