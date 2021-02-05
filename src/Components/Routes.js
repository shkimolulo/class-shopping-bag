import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductList from "../Screens/ProductList";
import Cart from "../Screens/Cart";
import Header from './Header';
export default () => (
  <Router>
    <Header />
    <Route path="/products" component={ProductList} />
    <Route path="/cart" component={Cart} />
  </Router>
)