import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import happyImg from '../../images/giphy.gif';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const placeOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

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

    return (
        <div className="shop-container">
            <div className="product-container">
                <h2>Cart Items: {cart.length}</h2>
                {
                    cart.map(product => <ReviewItem key={product.key} removeProduct={removeProduct} product={product}></ReviewItem>)
                }
                {
                    orderPlaced && <img style={{ marginLeft: "300px" }} src={happyImg} alt="" />
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={placeOrder} className="review-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;