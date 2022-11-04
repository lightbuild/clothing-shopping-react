import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {Elements} from '@stripe/react-stripe-js'
import {stripePromise} from './utils/stripe/stripe.utils'

import {store, persistor} from "./store/store";


import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App/>
        </Elements>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
