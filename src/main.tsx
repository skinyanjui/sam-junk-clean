
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'

console.log('Main.tsx starting');

// Ensure we're not importing any phantom services
if (typeof window !== 'undefined') {
  console.log('Window object available');
  console.log('Location:', window.location.href);
}

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');

console.log('Creating React root');

const root = createRoot(container);

try {
  console.log('Rendering App component');
  root.render(<App />);
  console.log('App component rendered successfully');
} catch (error) {
  console.error('Error rendering App:', error);
  throw error;
}
