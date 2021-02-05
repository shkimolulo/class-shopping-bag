import React from "react";
import ProductItem from "../Components/ProductItem"

class ProductList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      productItems: this.props.productItems
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    const { isToggleOn, productItems } = this.state;

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
                <button onClick={this.handleClick}>
                  {isToggleOn ? 'ON' : 'OFF'}
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