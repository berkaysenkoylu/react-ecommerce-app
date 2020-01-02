import React from 'react';

import classes from './NavigationAdmin.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationAdmin = (props) => {
    return (
        <li className={classes.NavigationAdmin}>
            <span className={classes.NavigationAdmin__Label}>
                Admin
            </span>

            <ul className={classes.NavigationAdmin__List}>
                <NavigationItem exact to="/admin/products">Products</NavigationItem>

                <NavigationItem exact to="/admin/add-product">Add Product</NavigationItem>

                <NavigationItem exact to="/admin/orders">Admin Orders</NavigationItem>
            </ul>
            
        </li>
    )
}

export default NavigationAdmin;