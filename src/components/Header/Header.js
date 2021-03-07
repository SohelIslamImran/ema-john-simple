import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../images/logo.png";
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img src={Logo} alt="" />
            </Link>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;