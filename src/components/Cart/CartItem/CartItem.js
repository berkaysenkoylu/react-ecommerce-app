import React from 'react';

import classes from './CartItem.module.scss';

const CartItem = (props) => {

    return (
        <div className={classes.CartItem}>
            <span className={classes.CartItem__Item}>
                {props.name} - Qty: {props.quantity}
            </span>
            
            <span className={classes.CartItem__Remove} onClick={props.clicked}>
                X
            </span>
        </div>
    )
}

export default CartItem;