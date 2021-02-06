import React from "react";
import ProductItem from "../Components/ProductItem"

class ProductList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      productItems: this.props.productItems,
      selectedProduct: {}
    };

    this.IsInCart = this.isInCart.bind(this)
  }
  addToCart(id, title, coverImage, price) {
    console.log("=== this.state.selectedProduct");
    console.log()

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
  isInCart(id) {
    let cartItems = this.props.cartItems;
    
    return cartItems.some(item => {
      return item.id === id;
    });
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
                  score={productItem.score}
                />
                <button onClick={
                  this.addToCart.bind(
                    this,
                    productItem.id, 
                    productItem.title,
                    productItem.coverImage,
                    productItem.price
                  )}>
                  {this.isInCart(productItem.id) ? '빼기' : '담기'}
                </button>
              </div>
            }) 
          }
        </div>
      </section>
    );
  }
}

export default ProductList;