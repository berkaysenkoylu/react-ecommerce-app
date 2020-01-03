import React from 'react';

import classes from './AppliedFilters.module.scss';
import AppliedFilter from './AppliedFilter/AppliedFilter';

const AppliedFilters = (props) => {
    let filterContent = null;
    if(props.filters && props.filters.length > 0) {
        filterContent = props.filters.map((filter, index) => {
            let filterName;
            if(filter.type === 'checkbox') {
                filterName = filter.name;
            }

            if(filter.type === 'slider') {
                filterName = `$${filter.values[0]} - $${filter.values[1]}`;
            }
            return <AppliedFilter key={index} name={filterName} type={filter.type} closed={props.appliedFilterClosed} />
        })
    }

    return (
        <div className={classes.AppliedFilters}>
            {filterContent}
        </div>
    )
}

export default AppliedFilters;