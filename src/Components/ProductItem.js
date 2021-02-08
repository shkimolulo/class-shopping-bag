import React from "react"
import PropTypes from "prop-types"

class ProductItem extends React.Component {
  constructor(props) {
    super(props);

    this.numberToWon = this.numberToWon.bind(this);
  }
  numberToWon(number) {
    let reg = /(^[+-]?\d+)(\d{3})/;
    let n = (number + '');
 
    while (reg.test(n)) {
      n = n.replace(reg, `$1,$2`);
    }  
 
    return n;    
  }
  render() {
    let title = this.props.title;
    let coverImage = this.props.coverImage;
    let price = this.numberToWon(this.props.price);
    
    return (
      <div>
        <img className="product__cover_image" src={coverImage} alt={title} title={title}/>
        <div className="product__data">
          <h3 className="product__title">{title}</h3>
          <h3 className="product__price">{price} 원</h3>
        </div>
      </div> 
    ); 
  }
}

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default ProductItem;