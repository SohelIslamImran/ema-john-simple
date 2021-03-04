import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="item-details">
                <h4 className="item-header"><Link to={"/product/" + key}>{name}</Link></h4>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                { props.showAddToCart && <button onClick={() => props.addProduct(props.product)} className="buy-btn"><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button> }
            </div>
        </div>
    );
};

export default Product;