import React from 'react';

import classes from './FilterContent.module.scss';
import FilterItem from '../FilterItem/FilterItem';

const FilterContent = (props) => {

    let contentClasses = [classes.FilterContent];
    if(props.show) {
        contentClasses = [classes.FilterContent, classes.FilterContent__Open];
    }
    else {
        contentClasses = [classes.FilterContent];
    }

    return (
        <div className={classes.FilterContent__Wrapper}>
            <ul className={contentClasses.join(' ')}>
                <FilterItem filterName="Category 1" />
                <FilterItem filterName="Category 2" />
                <FilterItem filterName="Category 3" />
                <FilterItem filterName="Category 4" />
                <FilterItem filterName="Category 5" />
            </ul>
        </div>
    )
}

export default FilterContent;