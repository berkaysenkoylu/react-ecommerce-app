import React, { useCallback, useEffect } from 'react';

import classes from './BigMenu.module.scss';
import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem'

const BigMenu = (props) => {
    let classList = [classes.BigMenu];

    const checkWindowSize = useCallback(() => {
        if(window.innerWidth > 600 && props.show) {
            props.closed();
        }
    }, [props]);

    useEffect(() => {
        window.addEventListener('resize', checkWindowSize);

        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, [checkWindowSize]);

    let navList = (
        <>
            <NavigationItem exact to="/">Home</NavigationItem>
            <NavigationItem exact to="/products">Shop</NavigationItem>
            <NavigationItem exact to="/auth">Sign in</NavigationItem>
            <NavigationItem exact to="/contact">Contact</NavigationItem>
            <NavigationItem exact to="/about">About us</NavigationItem>
        </>
    );
    if(props.isAuth) {
        navList = (
            <>
                <NavigationItem exact to="/">Home</NavigationItem>
                <NavigationItem exact to="/products">Shop</NavigationItem>
                {props.userStatus !== 'admin' ? <NavigationItem exact to="/orders">My Orders</NavigationItem> : null}
                <NavigationItem exact to="/contact">Contact</NavigationItem>
                <NavigationItem exact to="/about">About us</NavigationItem>
                {props.userStatus === 'admin' ? <NavigationItem exact to="/admin/products">Products</NavigationItem> : null}
                {props.userStatus === 'admin' ? <NavigationItem exact to="/admin/add-product">Add Product</NavigationItem> : null}
                {props.userStatus === 'admin' ? <NavigationItem exact to="/admin/orders">Admin Orders</NavigationItem> : null}
                <NavigationItem exact to="/logout">Logout</NavigationItem>
            </>
        )
    }

    if(props.show) {
        classList = [classes.BigMenu, classes.BigMenuOpen];
    }
    else {
        classList = [classes.BigMenu];
    }

    return (
        <div className={classList.join(' ')} onClick={props.closed}>
            <ul className={classes.LinkList}>
                {navList}
            </ul>
        </div>
    );
}

export default BigMenu;