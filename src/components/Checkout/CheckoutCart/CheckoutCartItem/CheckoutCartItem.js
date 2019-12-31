import React from 'react';

import classes from './CheckoutCartItem.module.scss';

const CheckoutCartItem = (props) => {
    return (
        <div className={classes.CheckoutCartItem}>
            <div className={classes.CheckoutCartItem__Image}>
                <img src={props.imageUrl} alt="pic" />
                <span>{props.quantity}</span>
            </div>
            <p className={classes.CheckoutCartItem__Name}>
                {props.name}
            </p>
            <p className={classes.CheckoutCartItem__Price}>
                ${props.price.toFixed(2)}
            </p>
        </div>
    )
}

export default CheckoutCartItem;