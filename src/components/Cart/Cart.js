import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    let subtotal = 0;
    let shipping = 0;
    cart.forEach(product => {
        subtotal += product.price;
        shipping += product.shipping;
    });
    const totalBeforeTax = subtotal + shipping;
    const tax = totalBeforeTax / 10;
    const orderTotal = totalBeforeTax + tax;
    const formatNum = num => Number(num.toFixed(2));

    return (
        <div>
            <h3 className="title">Order Summary</h3>
            <p className="items">Items: {cart.length}</p>
            <table className="cart-summary">
                <tbody>
                    <tr>
                        <td>Subtotal:</td>
                        <td>${formatNum(subtotal)}</td>
                    </tr>
                    <tr>
                        <td>Shipping & Handling:</td>
                        <td>${formatNum(shipping)}</td>
                    </tr>
                    <tr>
                        <td>Total before TAX:</td>
                        <td>${formatNum(totalBeforeTax)}</td>
                    </tr>
                    <tr>
                        <td>Estimated TAX:</td>
                        <td>${formatNum(tax)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Order Total:</td>
                        <td>${formatNum(orderTotal)}</td>
                    </tr>
                </tfoot>
            </table>
            <button className="review-btn">Review your order</button>
        </div>
    );
};

export default Cart;