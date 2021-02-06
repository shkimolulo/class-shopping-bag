import React from "react"
import PropTypes from "prop-types"
import ProductItem from "../Components/ProductItem"

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productItems: this.props.productItems
    };
  }
  render() {
    const { productItems } = this.state;

    return (
      <section>
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
              </div>
            }) 
          }
        </div>
      </section>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.array
}

export default Cart;