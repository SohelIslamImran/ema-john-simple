import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager.js';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://ema-john-simple-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://ema-john-simple-server.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, []);

    const addProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let quantity = 1;
        let newCart;
        if (sameProduct) {
            quantity = sameProduct.quantity + 1;
            sameProduct.quantity = quantity;
            const othersProduct = cart.filter(pd => pd.key !== product.key);
            newCart = [...othersProduct, sameProduct];
        }
        else {
            product.quantity = quantity;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, quantity)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart={true} addProduct={addProduct} product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="review-btn">Review your order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;