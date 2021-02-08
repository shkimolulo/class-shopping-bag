import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductItem from "./ProductItem";
import Cart from "./Cart";
import Header from "./Header";
import productItems from "../api/productItems";
import Pagination from "react-pagination-library";
import "./App.css"
import "react-pagination-library/build/css/index.css";

class App extends React.Component {
  constructor() {
    super();

    this.sortProductItemsByScore(productItems);
    const dataOfPerPage = 5;
    let chunkedProductItems = this.chunkProductItems(dataOfPerPage);

    this.state = {
      cartItems: [],
      currentPage: 1,
      currentDataOfPage: chunkedProductItems[0],
      chunkedProductItems: chunkedProductItems,
    };

    this.chunkProductItems = this.chunkProductItems.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.setCartItems = this.setCartItems.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }
  sortProductItemsByScore(productItems) {
    productItems.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
  }
  chunkProductItems(size) {
    const chunked = [];
    let index = 0;
  
    while (index < productItems.length) {
      chunked.push(productItems.slice(index, index + size));
      index += size;
    }

    this.setState({ chunkedProductItems: chunked });

    return chunked;
  }
  handleAddToCart(selectedProduct) {
    let { cartItems } = this.state;
    if (cartItems.length >= 3) {
      alert("장바구니에는 최대 3개의 상품이 담길 수 있습니다.");
      return;
    }

    selectedProduct.quantity = 1;
    cartItems.push(selectedProduct);

    this.setState({ cartItems: cartItems });
  }
  handleRemoveFromCart(selectedProduct) {
    let { cartItems } = this.state;
    let index = cartItems.findIndex(item => {
      return item.id === selectedProduct.id;
    });

    if (index > -1) {
      cartItems.splice(index, 1);
    } 

    this.setState({ cartItems: cartItems });
  }
  isInCart(id) {
    let { cartItems } = this.state;
    
    return cartItems.some(item => {
      return item.id === id;
    });
  }
  setCartItems(cartItems) {
    this.setState({ cartItems: cartItems });
  }
  changeCurrentPage(numPage) {
    let { chunkedProductItems } = this.state;

    this.setState({ currentPage: numPage });
    this.setState({ currentDataOfPage: chunkedProductItems[numPage - 1] });
  };
  render() {
    let { cartItems, currentPage, currentDataOfPage, chunkedProductItems } = this.state;

    return (
      <div className="container">
        <Router>
          <Header />
          <section>
          <div className="products">
            <Switch>
              <Route
                exact
                path="/products"
                render={props => {
                  return (
                    <div>
                      <h1>상품목록</h1>
                      {
                        currentDataOfPage.map(productItem => {
                          return <div key={productItem.id} className="product">
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
                                  <img alt="장바구니 빼기" src="http://simpleicon.com/wp-content/uploads/Shopping-Cart-10-64x64.png"></img>  
                                </button>
                                : <button onClick={() => this.handleAddToCart(productItem)}>
                                  <img alt="장바구니 담기" src="http://simpleicon.com/wp-content/uploads/Shopping-Cart-15-64x64.png"></img>
                                </button>
                              }
                          </div>
                        }) 
                      }
                      <Pagination
                        currentPage={currentPage}
                        totalPages={chunkedProductItems.length}
                        changeCurrentPage={this.changeCurrentPage}
                        theme="bottom-border"
                      />
                    </div>
                  );
                }}
              />
              <Route
                exact
                path="/cart"
                render={props => {
                  return (
                    <div>
                      <h1>장바구니</h1>
                      <Cart productItems={cartItems} setCartItems={this.setCartItems}/>
                    </div>
                  );
                }}
              />
            </Switch>
          </div>
          </section>
        </Router>
      </div>
    )
  }
}

export default App;
 