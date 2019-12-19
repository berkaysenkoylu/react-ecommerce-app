import React from 'react';

import classes from './NavigationItems.module.scss';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <li>Home</li>
            <li>Shop</li>
            <li>Sign in</li>
            <li>Contact</li>
            <li>About us</li>
        </ul>
    )
}

export default NavigationItems;