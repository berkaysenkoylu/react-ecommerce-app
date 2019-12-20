import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './PrevButton.module.scss';

const PrevButton = (props) => {
    return (
        <button className={classes.PrevButton} onClick={props.clicked} disabled={props.groupIndex > 0 ? false : true}>
            <svg className={classes.PrevButtonIcon}>
                <use xlinkHref={`${svg}#icon-chevron-thin-left`}></use>
            </svg>
        </button>
    )
}

export default PrevButton;