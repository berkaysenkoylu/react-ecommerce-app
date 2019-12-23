import React from 'react';

import classes from './Input.module.scss';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = '';

    if (!props.isValid && props.touched) {
        inputClasses.push(classes.Invalid);
        if(props.value !== ''){
            validationError = 'Please enter a valid value';
        }
        else {
            validationError = 'This field is required';
        }
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
            />;
            break;
        case 'textarea':
            break;
        default:
            break;
    }
    
    return(
        <div className={classes.Input}>
            {inputElement}
            <label className={classes.InputElement__Label}>{props.label}</label>
            <p className={classes.ValidationError}>{validationError}</p>
        </div>
    )
}

export default Input;