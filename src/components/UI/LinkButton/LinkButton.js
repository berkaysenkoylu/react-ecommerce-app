import React from 'react';

import classes from './LinkButton.module.scss';

const LinkButton = (props) => {
    return (
        <a href="/" className={classes.Button}>{props.children}</a>
    )
}

export default LinkButton;