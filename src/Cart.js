import React from "react"
import PropTypes from "prop-types"

class Cart extends React.Component {
  state = {
    productItems: [],
    // 초기화하기 모두 false, 1
    // productItems 는 각각 isPaymentTarget 을 가진다.
    // productItems 는 각각 상품의 수량을 가진다. 최소 1개
    // 

  }
}

Cart.propTypes = {
  // id: PropTypes.number.isRequired,
  // title: PropTypes.string.isRequired,
  // coverImage: PropTypes.string.isRequired,
  // price: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
}

export default Cart;