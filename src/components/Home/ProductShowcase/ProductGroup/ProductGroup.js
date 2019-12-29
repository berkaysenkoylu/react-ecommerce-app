import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ProductGroup.module.scss';
import Product from './Product/Product';

const ProductGroup = (props) => {

    let products = props.group.map(product => {
        return <Product key={product._id} {...product} />;
    })

    return (
        <div className={classes.ProductGroup}>
            {products}

            {props.hasLink ? <Link to="/products" className={classes.FinalLink}>See more</Link> : null}
        </div>
    )
}

export default ProductGroup;