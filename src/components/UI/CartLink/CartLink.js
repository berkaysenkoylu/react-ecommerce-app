import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './CartLink.module.scss';

const CartLink = () => {
    return (
        <div>
            <svg className={classes.CartIcon}>
                <use xlinkHref={`${svg}#icon-shopping-cart`}></use>
            </svg>
        </div>
    )
}

export default CartLink;