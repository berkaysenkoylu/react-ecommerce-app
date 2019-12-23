import React from 'react';

import classes from './Button.module.scss';

const Button = (props) => {
    let classList = [classes.Button];

    switch(props.btnType) {
        case 'BtnPrimary':
            classList = [classes.Button, classes.ButtonPrimary];
            break;
        default:
            break;
    }

    return (
        <button className={classList.join(' ')} onClick={props.clicked}>{props.children}</button>
    )
}

export default Button;