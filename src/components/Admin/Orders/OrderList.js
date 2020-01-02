import React from 'react';

import classes from './OrderList.module.scss';
import Order from './Order/Order';

const Orders = (props) => {

    let pageContent = null;
    if(props.list) {
        pageContent = (
            <div>
                {props.list.map(orderItem => {
                    return <Order 
                        key={orderItem._id}
                        {...orderItem}
                        orderEdited={props.editOrder}
                        deleteOrder={props.orderDeleted} />
                })}
            </div>
        )
    }

    return (
        <div className={classes.OrderList}>
            <header className={classes.OrderList__Header}>
                <h2>User Orders</h2>
            </header>

            {pageContent}
        </div>
    )
}

export default Orders;