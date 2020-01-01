import React, { useState, useRef } from 'react';

import classes from './Order.module.scss';

const Order = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    let checkBoxRef = useRef(null);

    const onOrderClickedHandler = (event) => {
        event.preventDefault();

        checkBoxRef.current.checked = !checkBoxRef.current.checked;
        setIsOpen(isOpen => !isOpen);
    }

    const getPdfButtonCLicked = (id) => {
        props.requestInvoice(id);
    }

    let contentClasses = [];
    if(isOpen) {
        contentClasses = [classes.Order__Content, classes.Order__ContentOpen];
    }
    else {
        contentClasses = [classes.Order__Content];
    }

    return (
        <div className={classes.Order}>
            <div className={classes.Order__Title} onClick={onOrderClickedHandler}>
                <span>{props.name}</span>

                <input type="checkbox" id="order-toggle" ref={checkBoxRef} />

                <label htmlFor="order-toggle"></label>
            </div>
            <div className={contentClasses.join(' ')}>
                <div className={classes.Order__Details}>
                    <h2>Details - <span onClick={() => getPdfButtonCLicked(props.name)}>Get Invoice (PDF)</span></h2>
                    <table className={classes.Order__Table}>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td><b>Order</b></td>
                                <td>{props.status}</td>
                            </tr>
                            <tr>
                                <td><b>Payment</b></td>
                                <td style={props.payment ? {color: "green"} : {color: "red"}}>{props.payment ? "Verified" : "Not verified"}</td>
                            </tr>
                            <tr>
                                <td><b>Shipment</b></td>
                                <td>{props.shipment}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={classes.Order__Table}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            { props.items.map(item => {
                                return (
                                    <tr key={item.productId._id}>
                                        <td>{item.productId.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>$ {item.productId.price}</td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Order;