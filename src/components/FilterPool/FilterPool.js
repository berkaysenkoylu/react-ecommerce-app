import React, { useState, useRef } from 'react';

import classes from './FilterPool.module.scss';
import Filter from './Filter/Filter';

import RangeSlider from '../UI/RangeSlider/RangeSlider';

const FilterPool = (props) => {
    // const [filterOpen, setFilterOpen] = useState(false);

    // let inputRef = useRef(null);

    // const onFilterPoolToggled = () => {
    //     setFilterOpen(inputRef.current.checked);
    // }

    // let contentClasses = [classes.Filter__Content];
    // if(filterOpen) {
    //     contentClasses = [classes.Filter__Content, classes.Filter__Content__Open];
    // }
    // else {
    //     contentClasses = [classes.Filter__Content];
    // }

    return (
        <div>
            <div className={classes.FilterPool__Header}>
                <p>Refine by</p>
                <span>clear filters</span>
            </div>

            <div className={classes.FilterPool__Filters}>
                {/* <div>
                    <div className={classes.Filter__Heading}>
                        <p>All Categories</p>
                        <input type="checkbox" id="filter-toggle" onClick={onFilterPoolToggled} ref={inputRef} />
                        <label htmlFor="filter-toggle">&nbsp;</label>
                    </div>

                    <div style={{overflow: 'hidden'}}>
                        <ul className={contentClasses.join(' ')}>
                            <li>Category 1</li>
                            <li>Category 2</li>
                            <li>Category 3</li>
                            <li>Category 4</li>
                            <li>Category 5</li>
                        </ul>
                    </div>
                </div> */}
                <Filter label="category" name="All Categories" />

                <Filter label="price" name="Pricing" />

                <RangeSlider />
            </div>
        </div>
    )
}

export default FilterPool;