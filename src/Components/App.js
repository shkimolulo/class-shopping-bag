import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "../Screens/ProductList";
import Cart from "../Screens/Cart";
import Header from './Header';
import ProductItems from "../productItems"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: ProductItems,
      cart: [],
    };
  }
  render() {
    return (
      <section>
        <h1>CLASS101</h1>
        <h4>모두가 사랑하는 일을 하며 살 수 있도록</h4>
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path="/products"
              render={props => {
                return (
                  <ProductList productItems={this.state.products}/>
                );
              }}
            />
            <Route
              exact
              path="/cart"
              render={props => {
                return (
                  <Cart cart={this.state.cart}/>
                );
              }}
            />
          </Switch>
        </Router>
      </section>
    )
  }
}

export default App;
 