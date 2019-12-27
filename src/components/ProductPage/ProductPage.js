import React, { useState, useEffect } from 'react';
import axiosProducts from '../../axios-products';

import classes from './ProductPage.module.scss';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import Numerator from '../UI/Numerator/Numerator';

const ProductPage = (props) => {
    const [product, setProduct] = useState(null);
    const [productItem, setProductItem] = useState({
        productId: '',
        quantity: 1,
        price: 0
    });

    useEffect(() => {
        axiosProducts.get('/' + props.match.params.id).then(response => {
            setProduct(response.data.product);
            setProductItem({
                productId: response.data.product._id,
                price: response.data.product.price,
                quantity: 1
            });
        }).catch(error => {
            console.log(error);
        });
    }, [props.match.params.id]);

    const onNumeratorChangedHandler = (value) => {
        const copiedProductItem = {...productItem};

        copiedProductItem.quantity = value;
        copiedProductItem.price = value * product.price;

        setProductItem(copiedProductItem);
    }

    const onAddToCardFormSubmitted = (event) => {
        event.preventDefault();

        console.log(productItem);
    }

    let pageContent = <Spinner strokeWidth={3} />;
    if(product) {
        pageContent = (
            <div className={classes.ProductView}>
                <div className={classes.ProductView__Image}>
                    <img src={product.imageUrl} alt="product" />
                </div>

                <div className={classes.ProductView__Info}>
                    <h2 className={classes.ProductView__Heading}>{product.name}</h2>
                    <p className={classes.ProductView__Price}>${product.price}</p>
                    <p className={classes.ProductView__Description}>{product.description}</p>
                </div>

                <form onSubmit={onAddToCardFormSubmitted} className={classes.ProductView__Form}>
                    <div className={classes.ProductView__Quantity}>
                        <label>Quantity: </label>
                        <Numerator numeratorValueChanged={onNumeratorChangedHandler} />
                    </div>
                    
                    <Button>Add to Cart</Button>
                </form>
            </div>);
    }

    return (
        <div className={classes.ProductPage}>
            {pageContent}
        </div>
    )
}

export default ProductPage;