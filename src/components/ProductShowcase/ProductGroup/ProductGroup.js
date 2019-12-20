import React from 'react';

import classes from './ProductGroup.module.scss';
import Product from './Product/Product';

const ProductGroup = (props) => {
    return (
        <div className={classes.ProductGroup}>
            <Product />

            <Product />

            <Product />

            <Product />
        </div>
    )
}

export default ProductGroup;