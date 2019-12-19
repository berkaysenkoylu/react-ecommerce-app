import React from 'react';

import classes from './MenuToggle.module.scss';

const MenuToggle = (props) => {
    return (
        <>
            <input type="checkbox" className={classes.CheckBox} id="burger-toggle" onClick={props.clicked} ref={props.checkBox}></input>

            <label htmlFor="burger-toggle" className={classes.MenuToggle}>
                <span className={classes.MenuToggle__Icon}>
                    &nbsp;
                </span>
            </label>
        </>
    )
}

export default MenuToggle;