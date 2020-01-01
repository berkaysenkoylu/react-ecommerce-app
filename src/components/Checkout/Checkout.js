import React, { useState, useEffect } from 'react';
import axiosCart from '../../axios-cart';
import axiosOrder from '../../axios-order';

import postscribe from 'postscribe';

import classes from './Checkout.module.scss';
import CheckoutCart from './CheckoutCart/CheckoutCart';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const Checkout = (props) => {
    const [items, setItems] = useState([]);
    const [checkoutRequestSuccessful, setCheckoutRequestSuccessful] = useState(false);

    useEffect(() => {
        if(props.userId) {
            axiosCart.get('/' + props.userId).then(response => {
                setItems(response.data.cart.items);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [props.userId]);

    const checkoutSubmitHandler = (formValues) => {
        let checkoutData = {
            ...formValues,
            basketItems: items
        };

        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        axiosOrder.post('', checkoutData, config).then(response => {
            if(response.data.result.status === 'success') {
                setCheckoutRequestSuccessful(true);

                postscribe('#script', response.data.result.checkoutFormContent);
            } 
            else {
                setCheckoutRequestSuccessful(false);
                console.log(response);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <div className={classes.Checkout__bg}></div>
            <div className={classes.Checkout}>
                <div className={classes.Checkout__Form}>
                    { checkoutRequestSuccessful ? <p>Loading...</p> : <CheckoutForm items={items} submitForm={checkoutSubmitHandler} />}
                    {/* { checkoutRequestSuccessful && paymentToken ? <iframe title="iyzipay" src={`https://sandbox-cpp.iyzipay.com?token=${paymentToken}&lang=tr&iframe=true`} frameBorder="0" height="100%" width="100%" style={{overflowX: "hidden", overflowY: "hidden", border: 'none', display: 'block', height: "100%", width: "100%", background: 'transparent'}}></iframe> : null } */}
                    { checkoutRequestSuccessful ? <div id="iyzipay-checkout-form" className="popup"></div> : null }
                </div>

                <div className={classes.Checkout__Cart}>
                    <CheckoutCart cartItems={items} />
                </div>
            </div>
        </>
    )
}

export default Checkout;