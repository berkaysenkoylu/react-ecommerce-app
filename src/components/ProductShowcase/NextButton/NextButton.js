import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './NextButton.module.scss';

const NextButton = (props) => {
    return (
        <button className={classes.NextButton} onClick={props.clicked}  disabled={props.groupIndex < props.maxGroupCount ? false : true}>
            <svg className={classes.NextButtonIcon}>
                <use xlinkHref={`${svg}#icon-chevron-thin-right`}></use>
            </svg>
        </button>
    )
}

export default NextButton;