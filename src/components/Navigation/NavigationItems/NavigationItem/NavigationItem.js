import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink exact={props.exact} to={props.to} className={classes.Link} activeClassName={classes.ActiveLink}>{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem;