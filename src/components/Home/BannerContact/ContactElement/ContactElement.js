import React from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './ContactElement.module.scss';

const ContactElement = (props) => {
    return (
        <div className={classes.ContactElement}>
            <svg className={classes.ContactElement__Icon}>
                <use xlinkHref={`${svg}#icon-${props.iconName}`}></use>
            </svg>
            <div className={classes.ContactElement__Text}>
                <h2>{props.contactTitle}</h2>
                <p>{props.contactPar}</p>
            </div>
        </div>
    )
}

export default ContactElement;