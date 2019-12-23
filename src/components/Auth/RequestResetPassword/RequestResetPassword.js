import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from './RequestResetPassword.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import checkValidity from '../../Auth/authValidation';

const RequestResetPassword = (props) => {
    const [email, setEmail] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'E-mail'
        },
        label: "E-mail",
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false,
        value: ''
    });
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        if(!props.reqSuccessfull) {
            setRequestSent(false);
        }
    }, [props.reqSuccessfull]);

    const inputChangedHandler = (event) => {
        const copiedEmailFormControl = { ...email };

        copiedEmailFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = checkValidity(event.target.value, copiedEmailFormControl.validation);
        copiedEmailFormControl.valid = isValid;
        copiedEmailFormControl.touched = true;

        setEmail(copiedEmailFormControl);
    }

    const resetFormSubmitted = (event) => {
        event.preventDefault();

        props.emailFormSubmit(email.value);
        setRequestSent(true);
    }


    let pageContent = null;
    if(props.loading) {
        pageContent = (
            <div className={classes.EmailCard}>
                LOADING...
            </div>
        );
    }
    else {
        if(props.reqSuccessfull && requestSent) {
            pageContent = (
                <div className={classes.EmailCard}>
                    <h2>We sent you an e-mail!</h2>
                    <p>Check your e-mail and follow the instructions.</p>
                    <Link to="/" className={classes.Link}>Home</Link>
                </div>
            );
        }
        else {
            pageContent = (<div className={classes.EmailCard}>
                <h2 className={classes.EmailHeader}>Enter your e-mail adress</h2>
                <form onSubmit={resetFormSubmitted} className={classes.Email__Form}>
                    <Input
                        elementType={email.elementType}
                        elementConfig={email.elementConfig}
                        label={email.label}
                        value={email.value}
                        touched={email.touched}
                        isValid={email.valid}
                        changed={inputChangedHandler}
                    />
                    <Button disabled={!email.valid}>Continue</Button>
                </form>
            </div>);
        }
    }

    

    // if(!requestSent) {
        
    // }

    return (
        <div className={classes.ContentWrapper}>
            <div className={classes.Background}></div>
            {pageContent}
        </div>
    )
}

export default RequestResetPassword;