import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.scss';

const NavigationItems = (props) => {

    let navList = (
        <>
            <li>
                <NavLink exact to="/" className={classes.Link} activeClassName={classes.ActiveLink}>Home</NavLink>
            </li>
            <li>Shop</li>
            <li>
                <NavLink to="/auth" className={classes.Link} activeClassName={classes.ActiveLink}>Sign in</NavLink>
            </li>
            <li>Contact</li>
            <li>About us</li>
        </>
    );
    if(props.isAuth) {
        navList = (
            <>
                <li>
                    <NavLink exact to="/" className={classes.Link} activeClassName={classes.ActiveLink}>Home</NavLink>
                </li>
                <li>Shop</li>
                <li>Contact</li>
                <li>About us</li>
                <li>
                    <NavLink to="/logout" className={classes.Link}>Logout</NavLink>
                </li>
            </>
        )
    }

    return (
        <ul className={classes.NavigationItems}>
            {navList}
        </ul>
    )
}

export default NavigationItems;