import React from "react"
import PropTypes from "prop-types"

class Coupon extends React.Component {
  render() {
    let title = this.props.title;
    
    return (
        <span>{title}</span >
    ); 
  }
}

Coupon.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Coupon;