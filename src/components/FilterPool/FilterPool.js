import React, { useState } from 'react';

import classes from './FilterPool.module.scss';
import Filter from './Filter/Filter';

const FilterPool = (props) => {
    const [filters, setFilter] = useState({
        allCategories: {
            name: 'All Categories',
            type: 'checkbox',
            elements: [
                {
                    name: 'Category 1',
                    selected: false
                },
                {
                    name: 'Category 2',
                    selected: false
                },
                {
                    name: 'Category 3',
                    selected: false
                }
            ]
        },
        pricing: {
            name: 'Pricing',
            type: 'slider',
            elements: {
                min: 0,
                max: 400,
                currMin: 0,
                currMax: 400
            }
        }
    });

    let filterContent = Object.keys(filters).map(filter => {
        return <Filter key={filter} label={filter} name={filters[filter].name} type={filters[filter].type} elements={filters[filter].elements}  />
    })

    return (
        <div>
            <div className={classes.FilterPool__Header}>
                <p>Refine by</p>
                <span>clear filters</span>
            </div>

            <div className={classes.FilterPool__Filters}>
                {filterContent}
            </div>
        </div>
    )
}

export default FilterPool;