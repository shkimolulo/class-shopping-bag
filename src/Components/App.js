import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductItem from "./ProductItem";
import Cart from "../Screens/Cart";
import Header from './Header';
import productItems from "../productItems";
import coupons from "../coupons";
import Coupon from "./Coupon";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      payingCartItems: [],
      usingCouponItem: [],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleCouponCheckboxChange = this.handleCouponCheckboxChange.bind(this);
    this.setCartItems = this.setCartItems.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }
  handleAddToCart(selectedProduct) {
    let { cartItems } = this.state;
    if (cartItems.length >= 3) {
      alert("장바구니에는 최대 3개의 상품이 담길 수 있습니다.");
      return;
    }

    selectedProduct.quantity = 1;
    cartItems.push(selectedProduct);

    this.setState({
      cartItems: cartItems,
    });
  }
  handleRemoveFromCart(selectedProduct) {
    let { cartItems } = this.state;
    let index = cartItems.findIndex(item => {
      return item.id === selectedProduct.id;
    });

    if (index > -1) {
      cartItems.splice(index, 1);
    } 

    this.setState({
      cartItems: cartItems,
    });
  }
  handleCouponCheckboxChange(event) {
    const target = event.target;
    const targetCoupon = coupons.find(item => item.title === target.value);

    this.setState({ usingCouponItem: targetCoupon });
  }
  isInCart(id) {
    let { cartItems } = this.state;
    
    return cartItems.some(item => {
      return item.id === id;
    });
  }
  calculateTotalPrice() {
    let { cartItems, usingCouponItem } = this.state;
    let totalPrice = 0;

    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    
    let totalPriceOfAvailableCoupon = 0;
    let totalPriceOfNotAvailableCoupon = 0;

    if (usingCouponItem.type === 'amount') {
      if (totalPriceOfAvailableCoupon === 0 && totalPriceOfNotAvailableCoupon === 0)
        cartItems.forEach(cartItem => {
          if (cartItem.availableCoupon !== false) {
            totalPriceOfAvailableCoupon += cartItem.price;
          } else {
            totalPriceOfNotAvailableCoupon += cartItem.price;
          }
        })

        let isLessThanDiscountAmount = totalPriceOfAvailableCoupon - usingCouponItem.discountAmount < 0
        if (isLessThanDiscountAmount) {
          totalPriceOfAvailableCoupon = 0;
        } else {
          totalPriceOfAvailableCoupon -= usingCouponItem.discountAmount;
        }
        totalPrice = totalPriceOfAvailableCoupon + totalPriceOfNotAvailableCoupon;
    } else if (usingCouponItem.type === 'rate') {
      cartItems.forEach(cartItem => {
        if (cartItem.availableCoupon !== false) {
          totalPriceOfAvailableCoupon += cartItem.price;
        } else {
          totalPriceOfNotAvailableCoupon += cartItem.price;
        }
      })

      totalPriceOfAvailableCoupon = totalPriceOfAvailableCoupon * (100 - usingCouponItem.discountRate) * 0.01
      totalPrice = totalPriceOfAvailableCoupon + totalPriceOfNotAvailableCoupon;
    }

    return totalPrice;
  }
  setCartItems(cartItems) {
    this.setState({
      cartItems: cartItems,
    })
  }
  render() {
    let { cartItems } = this.state;

    return (
      <section>
        <h1>CLASS101</h1>
        <h3>모두가 사랑하는 일을 하며 살 수 있도록</h3>
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path="/products"
              render={props => {
                return (
                  <section>
                    <h1>상품 목록</h1>
                    <div>
                      {
                        productItems.map(productItem => {
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
                  <section>
                    <h1>장바구니</h1>
                    <Cart productItems={cartItems} setCartItems={this.setCartItems}/>
                    <h1>쿠폰</h1>
                    <form>
                    {
                      coupons.map(coupon => {
                        return (
                          <span key={coupon.title}>
                            <input
                              name="isSelectedCoupon"
                              type="radio"
                              value={coupon.title}
                              onChange={this.handleCouponCheckboxChange}
                            />
                            <Coupon title={coupon.title}></Coupon>
                            <br/>
                          </span>
                        );
                      })
                    }
                    </form>
                    <h1>총 결제금액</h1>
                    <div>{this.calculateTotalPrice()}</div>
                  </section>
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
 