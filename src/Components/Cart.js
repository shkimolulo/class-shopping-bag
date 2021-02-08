import React from "react"
import ProductItem from "../components/ProductItem"
import coupons from "../api/coupons";
import Coupon from "./Coupon";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productItems: this.props.productItems,
      payingCartItems: [],
      usingCouponItem: [],
    }

    this.handleCouponRadioChange = this.handleCouponRadioChange.bind(this);
    this.plusProductItemQuantity = this.plusProductItemQuantity.bind(this);
    this.minusProductItemQuantity = this.minusProductItemQuantity.bind(this);
    this.changeProductItemQuantity = this.changeProductItemQuantity.bind(this);
    this.handlePayingCartItemCheckboxChange = this.handlePayingCartItemCheckboxChange.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }
  handleCouponRadioChange(event) {
    const target = event.target;
    const targetCoupon = coupons.find(item => item.title === target.value);

    this.setState({ usingCouponItem: targetCoupon });
    this.calculateTotalPrice();
  }
  plusProductItemQuantity(productItem) {
    productItem.quantity++;
    this.changeProductItemQuantity(productItem);
  }
  minusProductItemQuantity(productItem) {
    if (productItem.quantity - 1 < 1) { 
      alert("최소 1개 수량이 지정되어야 합니다.");
      return;
    }
    productItem.quantity--;
    this.changeProductItemQuantity(productItem);
  }
  changeProductItemQuantity(productItem) {
    let { payingCartItems } = this.state;
    let index = payingCartItems.findIndex(item => {
      return item.id === productItem.id;
    });

    if (index > -1) {
      payingCartItems[index] = productItem;
    }
    
    this.setState({ payingCartItems: payingCartItems });
    this.calculateTotalPrice();
  }
  handlePayingCartItemCheckboxChange(event) {
    const target = event.target;
    let { payingCartItems, productItems } = this.state;

    let isExistent = payingCartItems.some(item => {
      return item.id === target.value;
    });
    let isNotExistent = ! isExistent;

    if (isNotExistent && target.checked) {
      let index = productItems.findIndex(item => {
        return item.id === target.value;
      });
      payingCartItems.push(productItems[index]);
    }

    if (isExistent && ! target.checked) {
      let index = payingCartItems.findIndex(item => {
        return item.id === target.value;
      });
      payingCartItems.splice(index, 1);
    }

    this.setState({ payingCartItems: payingCartItems });
  }
  calculateTotalPrice() {
    let { payingCartItems, usingCouponItem } = this.state;
    let totalPrice = 0;

    payingCartItems.forEach(item => {
      item.totalPrice = 0;
      item.totalPrice += item.price * item.quantity;
      totalPrice += item.totalPrice;
    });
    
    let totalPriceOfAvailableCoupon = 0;
    let totalPriceOfNotAvailableCoupon = 0;

    payingCartItems.forEach(item => {
      if (item.availableCoupon !== false) {
        totalPriceOfAvailableCoupon += item.totalPrice;
      } else {
        totalPriceOfNotAvailableCoupon += item.totalPrice;
      }
    });

    if (usingCouponItem.type === 'amount') {
      let isLessThanDiscountAmount = totalPriceOfAvailableCoupon - usingCouponItem.discountAmount < 0
      if (isLessThanDiscountAmount) {
        totalPriceOfAvailableCoupon = 0;
      } else {
        totalPriceOfAvailableCoupon -= usingCouponItem.discountAmount;
      }
      totalPrice = totalPriceOfAvailableCoupon + totalPriceOfNotAvailableCoupon;
    } else if (usingCouponItem.type === 'rate') {
      totalPriceOfAvailableCoupon = totalPriceOfAvailableCoupon * (100 - usingCouponItem.discountRate) * 0.01
      totalPrice = Math.floor(totalPriceOfAvailableCoupon + totalPriceOfNotAvailableCoupon);
    }

    let reg = /(^[+-]?\d+)(\d{3})/;
    let n = (totalPrice + '');
 
    while (reg.test(n)) {
      n = n.replace(reg, `$1,$2`);
    }  
 
    return n; 
  }
  render() {
    const { productItems } = this.props;
    
    return (
      <div>
        {
          productItems.map(productItem => {
            return <div key={productItem.id} className="product">
              <input
                type="checkbox"
                value={productItem.id}
                onChange={this.handlePayingCartItemCheckboxChange}
              />
              <ProductItem
                id={productItem.id}
                title={productItem.title}
                coverImage={productItem.coverImage}
                price={productItem.price} 
              />
              <div>
                <button onClick={() => this.minusProductItemQuantity(productItem)}>-</button>
                <span> {productItem.quantity} </span>
                <button onClick={() => this.plusProductItemQuantity(productItem)}>+</button>
              </div>
            </div>
          }) 
        }
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
                  onChange={this.handleCouponRadioChange}
                />
                <Coupon title={coupon.title}></Coupon>
                <br/>
              </span>
            );
          })
        }
        </form>
        <div className="cart__total_price">
          <h1>총 결제금액</h1>
          <div><h2>{this.calculateTotalPrice()} 원</h2></div>
        </div>
      </div>
    );
  }
}

export default Cart;