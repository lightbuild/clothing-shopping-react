import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import {UserProvider} from "./context/user.context"
import {ProductsProvider} from "./context/products.context";
import {CartProvider} from "./context/cart.context";

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App/>
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
