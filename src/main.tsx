
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { ScrollToTop } from './components/ScrollToTop'

createRoot(document.getElementById("root")!).render(
  <>
    <ScrollToTop />
    <App />
  </>
);
