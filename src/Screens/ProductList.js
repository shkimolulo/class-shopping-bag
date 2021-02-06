import React from "react";
import ProductItem from "../Components/ProductItem"

class ProductList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
    };

    this.IsInCart = this.isInCart.bind(this)
  }
  addToCart(id, title, coverImage, price) {
    this.setState({
      selectedProduct: {
        id: id,
        title: title,
        coverImage: coverImage,
        price: price
      }
    }, function () {
      this.props.addToCart(this.state.selectedProduct);
    })
  }
  removeFromCart(id) {
    this.setState({
      selectedProduct: {
        id: id
      }
    }, function () {
      this.props.removeFromCart(this.state.selectedProduct);
    })
  }
  isInCart(id) {
    let { cartItems } = this.props;
    
    return cartItems.some(item => {
      return item.id === id;
    });
  }
  render() {
    const { productItems } = this.props;

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
                  score={productItem.score}
                />
                {
                  this.isInCart(productItem.id)
                  ? <button onClick={
                    this.removeFromCart.bind(
                      this,
                      productItem.id
                    )}>
                    빼기
                  </button>
                  : <button onClick={
                    this.addToCart.bind(
                      this,
                      productItem.id,
                      productItem.title,
                      productItem.coverImage,
                      productItem.price
                    )}>
                    담기
                  </button>
                }
              </div>
            }) 
          }
        </div>
      </section>
    );
  }
}

export default ProductList;