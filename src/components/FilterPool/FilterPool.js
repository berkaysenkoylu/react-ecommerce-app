import React, { useState, useEffect, useCallback } from 'react';

import classes from './FilterPool.module.scss';
import Filter from './Filter/Filter';

const FilterPool = (props) => {
    const [filters, setFilter] = useState({
        allCategories: {
            name: 'All Categories',
            type: 'checkbox',
            elements: [
                {
                    name: 'Miscellaneous',
                    selected: false
                },
                {
                    name: 'Sports',
                    selected: false
                },
                {
                    name: 'Clothing',
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

    const resetSpecificFilter = useCallback(
        (name, type) => {
            switch(type) {
                case "checkbox":
                    const copiedCategories = {...filters.allCategories};
                    const copiedEles = copiedCategories.elements.map(ele => {
                        if(ele.name !== name){
                            return ele;
                        }
                        else {
                            return {
                                ...ele,
                                selected: false
                            }
                        }
                    });
                    copiedCategories.elements = copiedEles;

                    props.selectedFilters(copiedCategories);
                    props.filterReseted();

                    setFilter(filters => {
                        return {
                            ...filters,
                            allCategories: copiedCategories
                        }
                    });
                    break;
                case "slider":
                    const copiedPricing = {...filters.pricing};
                    const elements = { ...copiedPricing.elements };
                    elements.currMin = elements.min;
                    elements.currMax = elements.max;
                    copiedPricing.elements = elements;

                    props.selectedFilters(copiedPricing);
                    props.filterReseted();
                    
                    setFilter(filters => {
                        return {
                            ...filters,
                            pricing: copiedPricing
                        }
                    });
                    break;
                default:
                    break;
            }
        },
        [filters.allCategories, filters.pricing, props],
    );

    useEffect(() => {
        // THIS IS CALLED TWICE SINCE AFTER RESET WE NULLIFY THE SELECTED RESET FILTER IN HOC
        // TODO: TAKE A LOOK AT THIS LATER
        if(props.resetFilter.name && props.resetFilter.type) {
            
            resetSpecificFilter(props.resetFilter.name, props.resetFilter.type);
            // console.log(`reset this filter: ${props.resetFilter.name} - ${props.resetFilter.type}`)
        }
        // eslint-disable-next-line
    }, [props.resetFilter]);

    const onFilterChangedHandler = (filterName, filterType, value) => {
        switch(filterType) {
            case 'checkbox':
                const copiedCategories = {...filters.allCategories};
                let copiedElements = copiedCategories.elements.map(ele => {
                    if(ele.name !== filterName) {
                        return ele;
                    }
                    else {
                        return {
                            ...ele,
                            selected: value
                        };
                    }
                });
                copiedCategories.elements = copiedElements;

                // Pass the info to parent
                props.selectedFilters(copiedCategories);

                setFilter(filters => {
                    return {
                        ...filters,
                        allCategories: copiedCategories
                    }
                });
                break;
            case 'slider':
                const copiedPricing = {...filters.pricing};
                const copiedEles = {...copiedPricing.elements};
                copiedEles.currMin = value.leftMost;
                copiedEles.currMax = value.rightMost;
                copiedPricing.elements = copiedEles;

                // Pass the info to parent
                props.selectedFilters(copiedPricing);

                setFilter(filters => {
                    return {
                        ...filters,
                        pricing: copiedPricing
                    }
                });
                break;
            default:
                break;
        }
    }

    const resetFilterHandler = () => {
        // RESET THE FILTERS
        console.log("Reset the filters");
        //props.resetAllFilters();
        // TODO
    }

    let filterContent = Object.keys(filters).map(filter => {
        return <Filter
            key={filter}
            label={filter}
            name={filters[filter].name}
            type={filters[filter].type}
            elements={filters[filter].elements}
            onFilterChanged={onFilterChangedHandler}
            resetSlider={props.resetFilter.type === "slider"}
        />
    });

    return (
        <div>
            <div className={classes.FilterPool__Header}>
                <p>Refine by</p>
                <span onClick={resetFilterHandler}>clear filters</span>
            </div>

            <div className={classes.FilterPool__Filters}>
                {filterContent}
            </div>
        </div>
    )
}

export default FilterPool;