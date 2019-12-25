import React from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './CheckBox.module.scss';

const CheckBox = (props) => {
    let classList = [classes.CheckBox];
    if(props.checked) {
        classList = [classes.CheckBox, classes.CheckBox__Checked];
    }
    else {
        classList = [classes.CheckBox];
    }

    return (
        <button className={classList.join(' ')} onClick={props.clicked}>
            {props.checked ? <div>
                <svg className={classes.CheckBox__Icon}>
                    <use xlinkHref={`${svg}#icon-checkmark`}></use>
                </svg>
            </div> : null}
        </button>
    )
}

export default CheckBox;