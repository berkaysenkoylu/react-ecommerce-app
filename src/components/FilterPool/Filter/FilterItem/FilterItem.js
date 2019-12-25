import React, { useState } from 'react';

import classes from './FilterItem.module.scss';
import CheckBox from '../../../UI/CheckBox/CheckBox';

const FilterItem = (props) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const onFilterItemClickedHandler = (event) => {
        if(event) {
            event.preventDefault();
        }

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