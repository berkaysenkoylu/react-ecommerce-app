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

    // let contentClasses = [classes.Filter__Content];
    // if(filterOpen) {
    //     contentClasses = [classes.Filter__Content, classes.Filter__Content__Open];
    // }
    // else {
    //     contentClasses = [classes.Filter__Content];
    // }

    return (
        <div className={classes.Filter} >
            <div className={classes.Filter__Heading} onClick={onFilterPoolToggled}>
                <p>{props.name}</p>
                <input type="checkbox" id={`${props.label}-toggle`} ref={inputRef} />
                <label htmlFor={`${props.label}-toggle`}>&nbsp;</label>
            </div>

            <FilterContent show={filterOpen} type={props.type} elements={props.elements} />

            {/* <div style={{overflow: 'hidden'}}>
                <ul className={contentClasses.join(' ')}>
                    <li>Category 1</li>
                    <li>Category 2</li>
                    <li>Category 3</li>
                    <li>Category 4</li>
                    <li>Category 5</li>
                </ul>
            </div> */}
        </div>
    )
}

export default Filter;