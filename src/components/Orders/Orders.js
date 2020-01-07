import React, { useState, useEffect } from 'react';
import axiosOrder from '../../axios-order';

import classes from './Orders.module.scss';
import Spinner from '../UI/Spinner/Spinner';
import Order from './Order/Order';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(props.userId) {
            setLoading(true);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            };
            axiosOrder.get('', config).then(response => {
                setOrders(response.data.orders);
                setLoading(false);
            });
        }
    }, [props.userId]);

    const onRequestInvoice = (id) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        axiosOrder.get('/' + id + '/invoice', config).then(response => {
            // console.log(response.data.url);
            let win = window.open(response.data.url, '_blank');
            if(win !== null) {
                win.focus();
            }
        });
    }
    

    let orderContent = null;
    if(!loading) {
        if(orders && orders.length > 0) {
            orderContent = orders.map(order => {
                return <Order 
                    key={order._id}
                    name={order._id}
                    status={order.orderStatus}
                    shipment={order.shipmentStatus}
                    payment={order.paymentVerified}
                    items={order.orderProducts.items} 
                    requestInvoice={onRequestInvoice}/>
            });
        }
        else {
            orderContent = <p className={classes.NoOrder}>You don't have any orders yet.</p>
        }
    }
    else {
        orderContent = <Spinner strokeWidth={4} />;
    }

    return (
        <section className={classes.Order}>
            <header className={classes.Order__Header}>
                <h2>My Orders</h2>
            </header>

            <div className={classes.Order__Content}>
                {orderContent}
            </div>
        </section>
    )
}

export default Orders;