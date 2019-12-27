import React, { useState } from 'react';

import svg from '../../../assets/images/sprite.svg';
import classes from './Numerator.module.scss';

const Numerator = (props) => {
    const [value, setValue] = useState(1);

    const onValueChangedHandler = (event, opt) => {
        event.preventDefault();

        switch(opt) {
            case 'decrement':
                if(value - 1 > 0) {
                    props.numeratorValueChanged(value - 1);
                    setValue(value => value - 1);
                }
                else {
                    props.numeratorValueChanged(value);
                }
                break;
            case 'increment':
                props.numeratorValueChanged(value + 1);
                setValue(value => value + 1);
                break;
            default:
                break;
        }
    }

    return (
        <div className={classes.Numerator}>
            <span className={classes.Numerator__Button} onClick={(event) => onValueChangedHandler(event, 'decrement')}>
                <svg className={classes.Numerator__Button__Icon}>
                    <use xlinkHref={`${svg}#icon-minus`}></use>
                </svg>
            </span>
            <span className={classes.Numerator__Number}>{value}</span>
            <span className={classes.Numerator__Button} onClick={(event) => onValueChangedHandler(event, 'increment')}>
                <svg className={classes.Numerator__Button__Icon}>
                    <use xlinkHref={`${svg}#icon-plus`}></use>
                </svg>
            </span>
        </div>
    )
}

export default Numerator;