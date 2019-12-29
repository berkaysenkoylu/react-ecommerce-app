import React from 'react';
import { Link } from 'react-router-dom';

import svg from '../../../assets/images/sprite.svg';
import classes from './CartLink.module.scss';

const CartLink = () => {
    return (
        <Link to='/cart'>
            <svg className={classes.CartIcon}>
                <use xlinkHref={`${svg}#icon-shopping-cart`}></use>
            </svg>
        </Link>
    )
}

export default CartLink;