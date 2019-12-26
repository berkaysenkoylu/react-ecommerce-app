import React from 'react';

import svg from '../../assets/images/sprite.svg';
import classes from './ProductMini.module.scss';

const ProductMini = (props) => {
    const onOpenModalHandler = () => {
        props.openModal(props._id);
    }

    let style = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    };

    return (
        <div className={classes.ProductMini}>
            <div className={classes.Image} style={style}>
                <div className={classes.ProductMini__MoreInfo} onClick={onOpenModalHandler}>
                    <svg className={classes.ProductMini__Icon}>
                        <use xlinkHref={`${svg}#icon-eye`}></use>
                    </svg>
                </div>
            </div>

            <div className={classes.Info}>
                <h2 className={classes.Info__header}>{props.name}</h2>
                <p className={classes.Info__description}>{props.description}</p>
                <p className={classes.Info__price}>${props.price}</p>
            </div>
        </div>
    )
}

export default ProductMini;