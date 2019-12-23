import React from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './RightArrow.module.scss';

const RightArrow = (props) => {
    return (
        <div className={classes.RightArrow} onClick={props.incrementIndex}>
            <svg className={classes.ArrowIcon}>
                <use xlinkHref={`${svg}#icon-chevron-thin-right`}></use>
            </svg>
        </div>
    )
}

export default RightArrow;