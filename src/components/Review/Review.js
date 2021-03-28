import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import happyImg from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();
    const proceedCheckout = () => {
        history.push('/shipment')
    }

    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:8000/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
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
                    <button onClick={proceedCheckout} className="review-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;