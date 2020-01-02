import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationAdmin from './NavigationAdmin/NavigationAdmin';

const NavigationItems = (props) => {
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
                {props.status !== 'admin' ? <NavigationItem exact to="/orders">My Orders</NavigationItem> : null}
                <NavigationItem exact to="/contact">Contact</NavigationItem>
                <NavigationItem exact to="/about">About us</NavigationItem>
                <NavigationItem exact to="/logout">Logout</NavigationItem>
                {props.status === 'admin' ? <>
                    <NavigationAdmin />
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