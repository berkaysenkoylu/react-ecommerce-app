import React from 'react';

import logo from '../../assets/images/logo.png';
import classes from './Logo.module.scss';

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logo} alt="logo" className={classes.LogoImg} />
        </div>
    )
}

export default Logo;