import React, { useState, useEffect } from 'react';

import classes from './FilterItem.module.scss';
import CheckBox from '../../../UI/CheckBox/CheckBox';

const FilterItem = (props) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    useEffect(() => {
        setCheckboxChecked(checkboxChecked => props.selected);
    }, [props.selected]);

    const onFilterItemClickedHandler = (event) => {
        if(event) {
            event.preventDefault();
        }

        props.changed(props.filterName, 'checkbox', !checkboxChecked);
        setCheckboxChecked(checkboxChecked => !checkboxChecked);
    }

    return (
        <div className={classes.FilterItem} onClick={onFilterItemClickedHandler}>
            <CheckBox checked={checkboxChecked} />
            <div className={classes.FilterName} >
                {props.filterName}
            </div>
        </div>
    )
}

export default FilterItem;