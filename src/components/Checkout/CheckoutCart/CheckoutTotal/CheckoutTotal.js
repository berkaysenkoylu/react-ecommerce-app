import React from 'react';

import classes from './CheckoutTotal.module.scss';

const CheckoutTotal = (props) => {
    return (
        <div className={classes.CheckoutTotal}>
            <span>Total</span>

            <span className={classes.CheckoutTotal__Currency}>USD <span className={classes.CheckoutTotal__Amount}>${props.total.toFixed(2)}</span></span>
        </div>
    )
}

export default CheckoutTotal;