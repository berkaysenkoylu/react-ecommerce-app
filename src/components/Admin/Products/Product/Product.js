import React, { useState, useRef } from 'react';

import classes from './Product.module.scss';
import Button from '../../../UI/Button/Button';

const Product = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    let checkBoxRef = useRef(null);

    const onProductClickedHandler = (event) => {
        event.preventDefault();

        checkBoxRef.current.checked = !checkBoxRef.current.checked;
        setIsOpen(isOpen => !isOpen);
    }

    let contentClasses = [classes.Product__Content];
    if(isOpen) {
        contentClasses = [classes.Product__Content, classes.Product__ContentOpen];
    }
    else {
        contentClasses = [classes.Product__Content];
    }

    return (
        <div className={classes.Product}>
            <div className={classes.Product__Title} onClick={onProductClickedHandler}>
                <span>{props.name}</span>

                <input type="checkbox" id="toggle-arrow" ref={checkBoxRef} />

                <label htmlFor="toggle-arrow"></label>
            </div>
            <div className={contentClasses.join(' ')}>
                <div className={classes.Product__Description}>
                    {props.description}
                </div>

                <div className={classes.Product__Cta}>
                    <Button clicked={(id) => props.editProduct(props._id)}>Edit</Button>
                    <Button btnType="BtnDanger" clicked={(id) => props.deleteProduct(props._id)}>Delete</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Product;