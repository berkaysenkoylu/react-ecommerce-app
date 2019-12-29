import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.scss';

const NavigationItems = (props) => {
    let navList = (
        <>
            <li>
                <NavLink exact to="/" className={classes.Link} activeClassName={classes.ActiveLink}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/products" className={classes.Link} activeClassName={classes.ActiveLink}>Shop</NavLink>
            </li>
            <li>
                <NavLink to="/auth" className={classes.Link} activeClassName={classes.ActiveLink}>Sign in</NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={classes.Link} activeClassName={classes.ActiveLink}>Contact</NavLink>
            </li>
            <li>
                <NavLink to="/about" className={classes.Link} activeClassName={classes.ActiveLink}>About us</NavLink>
            </li>
        </>
    );
    if(props.isAuth) {
        navList = (
            <>
                <li>
                    <NavLink exact to="/" className={classes.Link} activeClassName={classes.ActiveLink}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={classes.Link} activeClassName={classes.ActiveLink}>Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={classes.Link} activeClassName={classes.ActiveLink}>Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={classes.Link} activeClassName={classes.ActiveLink}>About us</NavLink>
                </li>
                <li>
                    <NavLink to="/logout" className={classes.Link}>Logout</NavLink>
                </li>
                {props.status === 'admin' ? <>
                    <li>
                        <NavLink to="/admin/products" className={classes.Link} activeClassName={classes.ActiveLink}>Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-product" className={classes.Link} activeClassName={classes.ActiveLink}>Add Product</NavLink>
                    </li>
                    </> : null}
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