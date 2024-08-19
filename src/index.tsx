import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import MUIWrapper from './Providers/MUIProvider';
import { CssBaseline } from '@mui/material';
import CSnackbarProvider from './Providers/CSnackbarProvider';

const container: HTMLElement = document.getElementById('root')!;
const root: Root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MUIWrapper>
            <CSnackbarProvider>
              <CssBaseline />
              <App />
            </CSnackbarProvider>
          </MUIWrapper>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
