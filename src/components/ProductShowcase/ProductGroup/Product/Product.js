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
            <div className={classes.Product__Title}>
                <p>Honey</p>
            </div>
            <div className={classes.Product__Info}>
                <h2>10$</h2>
                <p>Very delicious and nutritious honey!</p>
            </div>
            <div className={classes.Product__Cta}>
                <button>More info</button>
                <button>Add to cart</button>
            </div>
        </div>
    );
}

export default Product;