import React from "react"
import PropTypes from "prop-types"

function ProductItem({ id, title, coverImage, price, score }) {
  return (
    <div>
      <img src={coverImage} alt={title} title={title}/>
      <div>
        <h3>{ title }</h3>
        <h5>{ price }</h5>
        <h5>{ score }</h5>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}

export default ProductItem;