import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Product.module.scss';

const Product = (props) => {
    let imageStyle = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`
    }

    return (
        <div className={classes.Product}>
            <div className={classes.Product__Image} style={imageStyle}>
            </div>
            <div className={classes.Product__Price}>
                <p>{props.price} $</p> <span className={classes.Product__OldPrice}>12.99 $</span>
            </div>
            <div className={classes.Product__Info}>
                <h2>{props.name}</h2>
                <p>{props.description}</p>
            </div>
            <div className={classes.Product__Cta}>
                <Link to={`/products/${props._id}`} className={[classes.Product__Button, classes.Product__Button__Info].join(' ')}>More info</Link>
                {/* <a href="/no-page" className={[classes.Product__Button, classes.Product__Button__Add].join(' ')}>Add to cart</a> */}
            </div>
        </div>
    );
}

export default Product;