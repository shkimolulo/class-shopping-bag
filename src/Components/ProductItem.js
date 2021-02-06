import React from "react"
import PropTypes from "prop-types"

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let id = this.props.id;
    let title = this.props.title;
    let coverImage = this.props.coverImage;
    let price = this.props.price;
    
    return (
      <div>
        <img src={coverImage} alt={title} title={title}/>
        <div>
          <h3>{ title }</h3>
          <h5>{ price }</h5>
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