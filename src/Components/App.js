import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductItem from "./ProductItem";
import Cart from "../Screens/Cart";
import Header from './Header';
import ProductItems from "../productItems"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }
  handleAddToCart(selectedProduct) {
    let { cartItems } = this.state
    cartItems.push(selectedProduct);

    this.setState({
      cartItems: cartItems,
    })
  }
  handleRemoveFromCart(selectedProduct) {
    let { cartItems } = this.state;
    let index = cartItems.findIndex(item => {
      return item.id === selectedProduct.id;
    });

    if (index > -1) {
      cartItems.splice(index, 1)
    } 

    this.setState({
      cartItems: cartItems,
    })
  }
  isInCart(id) {
    let { cartItems } = this.state;
    
    return cartItems.some(item => {
      return item.id === id;
    });
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
                  <section>
                    <div>
                      {
                        ProductItems.map(productItem => {
                          return <div key={productItem.id}>
                            <ProductItem
                              id={productItem.id}
                              title={productItem.title}
                              coverImage={productItem.coverImage}
                              price={productItem.price} 
                              score={productItem.score}
                            />
                            {
                              this.isInCart(productItem.id)
                              ? <button onClick={() => this.handleRemoveFromCart(productItem)}>
                                빼기
                              </button>
                              : <button onClick={() => this.handleAddToCart(productItem)}>
                                담기
                              </button>
                            }
                          </div>
                        }) 
                      }
                    </div>
                  </section>
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
 