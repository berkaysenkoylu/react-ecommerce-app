import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Login.module.scss';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import checkValidity from '../authValidation';

const Login = (props) => {
    const [formControls, setFormControls] = useState({
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

    const onLoginFormSubmitHandler = (event) => {
        event.preventDefault();

        const loginForm = {
            email: formControls.email.value,
            password: formControls.password.value
        }

        if(isFormValid) {
            props.loginFormSubmit(loginForm);
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
        <div className={classes.LoginWrapper}>
            <div className={classes.LoginCard}>
                <div className={classes.SignupRoute}>
                    <div className={classes.SignupRoute__Content}>
                        You don't have an account? 
                        Signup <Link to='/auth/signup'>here!</Link>
                    </div>
                </div>

                <div className={classes.Login}>
                    <h2 className={classes.LoginHeader}>LOGIN</h2>
                    <form onSubmit={onLoginFormSubmitHandler} className={classes.Login__Form}>
                        {formFields}
                        <Button disabled={!isFormValid}>Login</Button>
                    </form>
                    <a href="/forgot-password" className={classes.LoginLink}>Forgot your password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;