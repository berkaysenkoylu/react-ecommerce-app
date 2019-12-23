import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Signup.module.scss';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import checkValidity from '../authValidation';

const Signup = (props) => {
    const [formControls, setFormControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            label: "Name",
            validation: {
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false,
            value: ''
        },
        email: {
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
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            label: "Password",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    // const [showError, setShowError] = useState(false);

    const inputChangedHandler = (event, inputName) => {
        const copiedFormControls = { ...formControls };

        const copiedFormControl = { ...copiedFormControls[inputName] };

        copiedFormControl.value = event.target.value;

        // Also check validity & mark it as touched
        let isValid = checkValidity(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedFormControls[inputName] = copiedFormControl;

        // Set the validiity of the form
        let formIsValid = true;
        Object.keys(copiedFormControls).forEach(formControl => {
            formIsValid = formIsValid && copiedFormControls[formControl].valid;
        });

        setIsFormValid(formIsValid);
        setFormControls(copiedFormControls);
    }

    const onSignupFormSubmitHandler = (event) => {
        event.preventDefault();

        const singupForm = {
            name: formControls.name.value,
            email: formControls.email.value,
            password: formControls.password.value
        }

        if(isFormValid) {
            props.signupFormSubmit(singupForm);
        }
    }

    let formFields = Object.keys(formControls).map(formControl => {
        return <Input
            key={formControl}
            elementType={formControls[formControl].elementType}
            elementConfig={formControls[formControl].elementConfig}
            label={formControls[formControl].label}
            value={formControls[formControl].value}
            touched={formControls[formControl].touched}
            isValid={formControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
        />
    });

    return (
        <>
            <div className={classes.SignupBackground}></div>
            <div className={classes.SignupWrapper}>
                
                <div className={classes.SignupCard}>
                    <h2 className={classes.SignupHeader}>Sign up</h2>
                    <form onSubmit={onSignupFormSubmitHandler} className={classes.Signup__Form}>
                        {formFields}
                            <Button disabled={!isFormValid}>Signup</Button> {props.message ? <span>{props.message}</span> : null}
                    </form>
                    <p>Already have an account? <Link to="/auth/login">Login</Link></p>
                </div>
            </div>
        </>
    );
}

export default Signup;