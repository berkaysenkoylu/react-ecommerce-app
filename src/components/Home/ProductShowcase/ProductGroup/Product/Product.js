import React from 'react';

import classes from './Product.module.scss';

const Product = (props) => {
    //https://frontiersinblog.files.wordpress.com/2019/12/frontiers-bioengineering-biotechnology-manuka-honey-infections-1.jpg?w=1000
    //https://images-na.ssl-images-amazon.com/images/I/8166xCVDGnL._SY355_.jpg
    return (
        <div className={classes.Product}>
            <div className={classes.Product__Image}>
                {/* <img 
                    src="https://frontiersinblog.files.wordpress.com/2019/12/frontiers-bioengineering-biotechnology-manuka-honey-infections-1.jpg?w=1000" 
                    alt="prodcut_image" /> */}
            </div>
            <div className={classes.Product__Price}>
                <p>10 $</p> <span className={classes.Product__OldPrice}>12.99 $</span>
            </div>
            <div className={classes.Product__Info}>
                <h2>Honey</h2>
                <p>Very delicious and nutritious honey!</p>
            </div>
            <div className={classes.Product__Cta}>
                <a href="/no-page" className={[classes.Product__Button, classes.Product__Button__Info].join(' ')}>More info</a>
                <a href="/no-page" className={[classes.Product__Button, classes.Product__Button__Add].join(' ')}>Add to cart</a>
            </div>
        </div>
    );
}

export default Product;