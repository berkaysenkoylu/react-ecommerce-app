import React from 'react';

import classes from './FilterContent.module.scss';
import FilterItem from '../FilterItem/FilterItem';
import RangeSlider from '../../../UI/RangeSlider/RangeSlider';

const FilterContent = (props) => {

    let contentClasses = [classes.FilterContent];
    if(props.show) {
        contentClasses = [classes.FilterContent, classes.FilterContent__Open];
    }
    else {
        contentClasses = [classes.FilterContent];
    }

    let filterContent = null;
    switch(props.type) {
        case 'checkbox':
            filterContent = props.elements.map(element => {
                return <FilterItem key={element.name} filterName={element.name} changed={props.filterChanged} selected={element.selected} />
            });
            break;
        case 'slider':
            filterContent = <div className={classes.Slider__Wrapper}><RangeSlider max={props.elements.max} changed={props.filterChanged} reset={props.sliderReset} /></div>
            break;
        default:
            break;
    }

    return (
        <div className={classes.FilterContent__Wrapper}>
            <div className={contentClasses.join(' ')}>
                {filterContent}
            </div>
        </div>
    )
}

export default FilterContent;