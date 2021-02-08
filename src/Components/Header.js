import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => (
	<div className="header">
      <NavLink exact to="/cart" className="header__nav" activeClassName="header__active_nav">장바구니</NavLink>
      <NavLink to="/products" className="header__nav" activeClassName="header__active_nav" >상품목록</NavLink>
	</div>
)

export default Header;