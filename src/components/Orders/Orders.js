import React from 'react';

import classes from './Orders.module.scss';
import Order from './Order/Order';

const Orders = (props) => {
    return (
        <section className={classes.Order}>
            <header className={classes.Order__Header}>
                <h2>My Orders</h2>
            </header>

            <div className={classes.Order__Content}>
                <Order name="Nigga" />
            </div>
        </section>
    )
}

export default Orders;