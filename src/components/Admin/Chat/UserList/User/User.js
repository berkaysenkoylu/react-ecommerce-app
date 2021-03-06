import React from 'react';

import classes from './User.module.scss';

const User = (props) => {

    let classList = [classes.User];
    if(props.isFocused) {
        classList = [classes.User, classes.FocusedUser];
    }
    else {
        classList = [classes.User];
    }

    return (
        <span className={classList.join(' ')} onClick={props.clicked}>
            {props.username}
            {(props.unseen > 0) ? <span className={classes.Unseen}>{props.unseen}</span> : null}
        </span>
    )
}

export default User;