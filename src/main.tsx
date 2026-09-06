import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createDateRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);