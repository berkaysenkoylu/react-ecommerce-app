import React from 'react';
import { Link } from 'react-router-dom';

import classes from './CheckoutCart.module.scss';
import CheckoutCartItem from './CheckoutCartItem/CheckoutCartItem';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';

const CheckoutCart = (props) => {

    let content = null;
    let total = 0;
    if(props.cartItems) {
        content = props.cartItems.map(item => {
            total += item.quantity * item.productId.price;

            return <CheckoutCartItem key={item._id} imageUrl={item.productId.imageUrl} quantity={item.quantity} name={item.productId.name} price={item.productId.price} />
        });
    }

    return (
        <div className={classes.CheckoutCart}>
            {content}

            <CheckoutTotal total={total} />

            <div className={classes.CheckoutCart__Link}>
                <Link to="/cart">Return to cart</Link>
            </div>
        </div>
    )
}

export default CheckoutCart;