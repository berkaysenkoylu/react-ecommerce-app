import React, { useState, useRef } from 'react';

import classes from './Order.module.scss';

const Order = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    let checkBoxRef = useRef(null);

    const onOrderClickedHandler = (event) => {
        event.preventDefault();

        checkBoxRef.current.checked = !checkBoxRef.current.checked;
        setIsOpen(isOpen => !isOpen);
    }

    let contentClasses = [];
    if(isOpen) {
        contentClasses = [classes.Order__Content, classes.Order__ContentOpen];
    }
    else {
        contentClasses = [classes.Order__Content];
    }

    return (
        <div className={classes.Order}>
            <div className={classes.Order__Title} onClick={onOrderClickedHandler}>
                <span>{props.name}</span>

                <input type="checkbox" id="order-toggle" ref={checkBoxRef} />

                <label htmlFor="order-toggle"></label>
            </div>
            <div className={contentClasses.join(' ')}>
                <div className={classes.Order__Description}>
                    {props.description}
                </div>
            </div>
            
        </div>
    )
}

export default Order;