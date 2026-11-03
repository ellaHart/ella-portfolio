// Global styles load first so component CSS modules can override them.
import './styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { CreativeModeProvider } from './context/CreativeMode';
import { ThemeProvider } from './context/Theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CreativeModeProvider>
          <App />
        </CreativeModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
