import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './LeftArrow.module.scss';

const LeftArrow = (props) => {
    return (
        <div className={classes.LeftArrow} onClick={props.decrementIndex}>
            <svg className={classes.ArrowIcon}>
                <use xlinkHref={`${svg}#icon-chevron-thin-left`}></use>
            </svg>
        </div>
    );
}

export default LeftArrow;