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
      productItems: ProductItems,
      cartItems: [],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  handleAddToCart(selectedProduct) {
    let cartItems = this.state.cartItems;
    selectedProduct.quantity = 1;
    cartItems.push(selectedProduct);

    this.setState({
      cartItems: cartItems,
    })

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
                  <ProductList
                    addToCart={this.handleAddToCart}
                    productItems={this.state.productItems}
                    cartItems={this.state.cartItems}
                  />
                );
              }}
            />
            <Route
              exact
              path="/cart"
              render={props => {
                return (
                  <Cart productItems={this.state.cartItems}/>
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
 