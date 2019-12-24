import React, { Component } from 'react';

import classes from './ProductContainer.module.scss';
import FilterPool from '../../components/FilterPool/FilterPool';
import Paginator from '../../components/Paginator/Paginator';

class ProductContainer extends Component {

    onPaginationChangeHandler = (paginationObject) => {
        // console.log(paginationObject);
    }

    render() {
        return (
            <div className={classes.ProductContainer}>
                <div className={classes.ProductFilter}>
                    <FilterPool />
                </div>
                <div className={classes.Products}>
                    <div className={classes.Products__Pool}>Product Pool</div>
                    <div className={classes.Products__Pagination}>
                        <Paginator itemPerPage={[3, 5, 10]} maxItemCount={10} pagination={this.onPaginationChangeHandler} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductContainer;