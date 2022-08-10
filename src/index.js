import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import {CartProvider} from "./context/cart.context";

import {Provider} from 'react-redux'
import {store} from "./store/store";

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <App/>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
