import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
	<div>
    	<ul>
    		<li><Link to="/cart">Cart</Link></li>
        <li><Link to="/products">Product List</Link></li>
    	</ul>
	</div>
)

export default Header;