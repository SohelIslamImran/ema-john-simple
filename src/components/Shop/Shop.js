import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager.js';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => key === pd.key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
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