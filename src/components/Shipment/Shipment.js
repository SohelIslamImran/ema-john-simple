import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import Payment from "../Payment/Payment";
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email } = loggedInUser;

    const [shippingData, setShippingData] = useState(null);

    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePayment = paymentId => {
        const savedCart = getDatabaseCart();
        const oderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipping: shippingData,
            paymentId,
            orderTime: new Date()
        };

        fetch('https://ema-john-simple-server.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(oderDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    processOrder();
                    alert('Your order placed successfully.');
                }
            });
    };

    console.log(errors);
    console.log(watch("example"));

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ display: shippingData ? 'none' : 'block' }}>
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                    <input name="name" defaultValue={name} ref={register({ required: true })} placeholder="Your Name" />
                    {errors.name && <span className="error">Name is required</span>}

                    <input name="email" defaultValue={email} ref={register({ required: true })} placeholder="Your Email" />
                    {errors.email && <span className="error">Email is required</span>}

                    <input name="address" ref={register({ required: true })} placeholder="Your Address" />
                    {errors.address && <span className="error">Address is required</span>}

                    <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
                    {errors.phone && <span className="error">Phone Number is required</span>}

                    <input type="submit" />
                </form>
            </div>
            <div style={{ display: shippingData ? 'block' : 'none' }}>
                <Payment handlePayment={handlePayment} />
            </div>
        </div>
    );
};

export default Shipment;