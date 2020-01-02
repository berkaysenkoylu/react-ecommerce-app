import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axiosCart from '../../axios-cart';

import classes from './Cart.module.scss';
import Spinner from '../UI/Spinner/Spinner';
import CartItem from './CartItem/CartItem';
import Button from '../UI/Button/Button';

const Cart = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(props.userId) {
            setIsLoading(true);
            axiosCart.get('/' + props.userId).then(response => {
                setCartItems(response.data.cart.items);
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
            })
        }
        
    }, [props.userId]);

    const onDeleteButtonPressedHandler = (event, id) => {
        event.preventDefault();

        axiosCart.delete('/' + props.userId + '/' + id).then(response => {
            setCartItems(cartItems => {
                let copiedCartItems = [...cartItems];

                copiedCartItems = copiedCartItems.filter(item => item._id !== id);

                return copiedCartItems;
            });
        }).catch(error => {
            console.log(error);
        });
    }

    const onCheckoutHandler = (event) => {
        event.preventDefault();

        props.history.push('/checkout');
    }

    let pageContent = null;
    if(isLoading) {
        pageContent = <Spinner strokeWidth={4} />
    }
    else {
        if(cartItems !== []) {
            if(cartItems.length > 0) {
                pageContent = cartItems.map(item => {
                    return <CartItem key={item._id} name={item.productId.name} quantity={item.quantity} clicked={(event) => onDeleteButtonPressedHandler(event, item._id)} />
                });
            }
            else {
                pageContent = <p>You haven't added any item to your cart.</p>
            }
        }
    }

    return (
        <div className={classes.Cart}>
            <h2 className={classes.Cart__Heading}>Cart Items</h2>

            <div className={classes.Cart__Content}>
                {pageContent}
            </div>

            <div className={classes.Cart__Cta}>
                <Button clicked={onCheckoutHandler} disabled={cartItems.length <= 0}>Checkout</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps, null)(Cart);