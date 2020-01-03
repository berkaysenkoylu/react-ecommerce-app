import React, { useState, useRef } from 'react';

import classes from './Filter.module.scss';
import FilterContent from './FilterContent/FilterContent';

const Filter = (props) => {
    const [filterOpen, setFilterOpen] = useState(false);

    let inputRef = useRef(null);

    const onFilterPoolToggled = () => {
        inputRef.current.checked = !inputRef.current.checked;
        setFilterOpen(inputRef.current.checked);
    }

    return (
        <div className={classes.Filter} >
            <div className={classes.Filter__Heading} onClick={onFilterPoolToggled}>
                <p>{props.name}</p>
                <input type="checkbox" id={`${props.label}-toggle`} ref={inputRef} />
                <label htmlFor={`${props.label}-toggle`}>&nbsp;</label>
            </div>

            <FilterContent show={filterOpen} type={props.type} elements={props.elements} filterChanged={props.onFilterChanged} sliderReset={props.resetSlider} />
        </div>
    )
}

export default Filter;