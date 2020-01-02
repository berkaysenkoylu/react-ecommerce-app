import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import classes from './CartModal.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

const CartModal = (props) => {
    return (
        ReactDOM.createPortal(
            props.show ? (
                <div className={classes.CartModalContainer} onClick={props.closed}>
                    <Backdrop show={props.show} />
                    <div className={classes.CartModal}>
                        <p>{props.message || "Product has been added to the cart!"}</p>

                        <div className={classes.CartModalCallToAction}>
                            <Link to='/cart' className={classes.ViewCartButton}>View Cart</Link>
                            <Link to='/checkout' className={classes.CheckoutButton}>Checkout</Link>
                        </div>
                    </div>
                </div>) : null,
            document.getElementById('error-root')
        )
    );
}

export default CartModal;