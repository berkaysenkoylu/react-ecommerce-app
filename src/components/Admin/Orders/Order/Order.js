import React, { useState } from 'react';

import classes from './Order.module.scss';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';

const Order = (props) => {
    const [formControls, setFormControls] = useState({
        orderStatus: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Pending', displayValue: 'Pending' },
                    { value: 'Verified', displayValue: 'Verified' },
                    { value: 'Denied', displayValue: 'Denied' },
                ]
            },
            value: props.orderStatus
        },
        shipmentStatus: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'Pending', displayValue: 'Pending' },
                    { value: 'In Cargo', displayValue: 'In Cargo' },
                    { value: 'Delivered', displayValue: 'Delivered' },
                ]
            },
            value: props.shipmentStatus
        }
    });

    const updateState = (inputName, value) => {
        setFormControls(formControls => {
            const copiedFormControls = {...formControls};

            const copiedFormControl = {...copiedFormControls[inputName]};

            copiedFormControl.value = value;

            copiedFormControls[inputName] = copiedFormControl;

            return copiedFormControls
        });
    }

    const onInputValueChanged = (event, inputName) => {
        event.preventDefault();

        updateState(inputName, event.target.value);

        const patchPayload = {};

        patchPayload[inputName] = event.target.value;

        props.orderEdited(props._id, patchPayload);
    }

    return (
        <div className={classes.Order}>
            <header className={classes.Order__Header}>
                <h2>{props._id}</h2>
                <h2>{props.userId.userMail}</h2>
            </header>

            <div className={classes.Order__Content}>
                <div className={classes.Order__Edit}>
                    <div className={classes.Order__Edit__Label}>
                        Order status: 
                    </div>
                    <Input
                        elementType={formControls.orderStatus.elementType}
                        elementConfig={formControls.orderStatus.elementConfig}
                        value={formControls.orderStatus.value}
                        changed={(event) => onInputValueChanged(event, 'orderStatus')}
                    />
                </div>
                
                <div className={classes.Order__Edit}>
                    <div className={classes.Order__Edit__Label}>
                        Shipping status: 
                    </div>
                    <Input
                        elementType={formControls.shipmentStatus.elementType}
                        elementConfig={formControls.shipmentStatus.elementConfig}
                        value={formControls.shipmentStatus.value}
                        changed={(event) => onInputValueChanged(event, 'shipmentStatus')}
                    />
                </div>
            </div>

            <div className={classes.Order__Cta}>
                <Button btnType="BtnDanger" clicked={(id) => props.deleteOrder(props._id)}>Delete</Button>
            </div>
        </div>
    )
}

export default Order;