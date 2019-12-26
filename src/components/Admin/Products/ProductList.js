import React from 'react';

import classes from './ProductList.module.scss';
import Product from './Product/Product';

const ProductList = (props) => {

    let products = props.list.map(product => {
        return <Product key={product._id} {...product} editProduct={props.editProduct} deleteProduct={props.deleteProduct} />
    });

    return (
        <div className={classes.ProductList}>
            <h2 className={classes.ProductList__Heading}>Product Administration</h2>
            <div style={{marginTop: '3rem'}}>
                {products}
            </div>
        </div>
    );
}

export default ProductList;