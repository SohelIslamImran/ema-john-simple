import React from 'react';

const Inventory = () => {

    const product = {};

    const handleAddProduct = () => {
        fetch("https://ema-john-simple-server.herokuapp.com/addProduct", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <form action="">
                <p>Name: <input type="text" /></p>
                <p>Price: <input type="number" /></p>
                <p>Quantity: <input type="number" /></p>
                <p>Product Image: <input type="file" /></p>
            </form>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;