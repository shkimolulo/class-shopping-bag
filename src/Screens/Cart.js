import React from "react"
import PropTypes from "prop-types"
import ProductItem from "../components/ProductItem"

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productItems: this.props.productItems,
    }
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
    let { productItems } = this.state;
    let index = productItems.findIndex(item => {
      return item.id === productItem.id;
    });

    if (index > -1) {
      productItems[index] = productItem;
    }
    
    this.setState({ productItems: productItems});
    this.props.setCartItems(productItems);
  }
  render() {
    const { productItems } = this.props;
    
    return (
      <div>
        {
          productItems.map(productItem => {
            return <div key={productItem.id}>
              <ProductItem
                id={productItem.id}
                title={productItem.title}
                coverImage={productItem.coverImage}
                price={productItem.price} 
              />
              <button onClick={() => this.minusProductItemQuantity(productItem)}>
                -
              </button>
              <span> {productItem.quantity} </span>
              <button onClick={() => this.plusProductItemQuantity(productItem)}>
                +
              </button>
            </div>
          }) 
        }
      </div>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.array
}

export default Cart;