import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';
import RotaPrinc from './routes';


function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <RotaPrinc />
        <GlobalStyle />
        <ToastContainer autoClose={3000} className="toast-container" />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
