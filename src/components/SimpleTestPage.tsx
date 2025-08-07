import React from 'react';

const SimpleTestPage = () => {
  console.log('SimpleTestPage rendering');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#B22234', marginBottom: '20px' }}>
          Uncle Sam Junk Removal
        </h1>
        <p style={{ marginBottom: '20px', color: '#333', fontSize: '18px' }}>
          Welcome! The application is loading successfully.
        </p>
        <p style={{ color: '#666' }}>
          This is a test page to verify that React is working correctly.
          If you can see this, the basic app structure is functioning.
        </p>
        <div style={{ 
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f0f8ff',
          border: '1px solid #e0e0e0',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: '#1A1F71', marginBottom: '10px' }}>System Status:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>✅ React is rendering</li>
            <li>✅ CSS is loading</li>
            <li>✅ Components are functional</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestPage;