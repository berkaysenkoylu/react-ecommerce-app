import React, { useState } from 'react';

import classes from './CheckoutForm.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import checkValidity from '../../../utility/formValidation';

const CheckoutForm = (props) => {
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
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            label: "Name",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        lastname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            label: "Last Name",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        address: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address'
            },
            label: "Address",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City'
            },
            label: "City",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            label: "Country",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        zip: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            label: "Zip Code",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [formValid, setFormValid] = useState(false);

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

        setFormValid(formIsValid);
        setFormControls(copiedFormControls);
    }

    const onCheckoutFormSubmitted = (event) => {
        event.preventDefault();

        let formData = {
            email: formControls.email.value,
            name: formControls.name.value,
            lastname: formControls.lastname.value,
            address: formControls.address.value,
            city: formControls.city.value,
            country: formControls.country.value,
            zip: formControls.zip.value
        };

        props.submitForm(formData);
    }

    return (
        <form className={classes.CheckoutForm} onSubmit={onCheckoutFormSubmitted}>
            <div className={classes.CheckoutForm__Section}>
                <h2>Contact information</h2>

                <Input
                    elementType={formControls.email.elementType}
                    elementConfig={formControls.email.elementConfig}
                    label={formControls.email.label}
                    value={formControls.email.value}
                    touched={formControls.email.touched}
                    isValid={formControls.email.valid}
                    changed={(event) => inputChangedHandler(event, 'email')}
                />
            </div>

            <div className={classes.CheckoutForm__Section}>
                <h2>Shipping address</h2>

                <div className={classes.CheckoutForm__Section__Row}>
                    <Input
                        elementType={formControls.name.elementType}
                        elementConfig={formControls.name.elementConfig}
                        label={formControls.name.label}
                        value={formControls.name.value}
                        touched={formControls.name.touched}
                        isValid={formControls.name.valid}
                        changed={(event) => inputChangedHandler(event, 'name')}
                    />

                    <Input
                        elementType={formControls.lastname.elementType}
                        elementConfig={formControls.lastname.elementConfig}
                        label={formControls.lastname.label}
                        value={formControls.lastname.value}
                        touched={formControls.lastname.touched}
                        isValid={formControls.lastname.valid}
                        changed={(event) => inputChangedHandler(event, 'lastname')}
                    />
                </div>

                <Input
                    elementType={formControls.address.elementType}
                    elementConfig={formControls.address.elementConfig}
                    label={formControls.address.label}
                    value={formControls.address.value}
                    touched={formControls.address.touched}
                    isValid={formControls.address.valid}
                    changed={(event) => inputChangedHandler(event, 'address')}
                />

                <Input
                    elementType={formControls.city.elementType}
                    elementConfig={formControls.city.elementConfig}
                    label={formControls.city.label}
                    value={formControls.city.value}
                    touched={formControls.city.touched}
                    isValid={formControls.city.valid}
                    changed={(event) => inputChangedHandler(event, 'city')}
                />

                <div className={classes.CheckoutForm__Section__Row}>
                    <Input
                        elementType={formControls.country.elementType}
                        elementConfig={formControls.country.elementConfig}
                        label={formControls.country.label}
                        value={formControls.country.value}
                        touched={formControls.country.touched}
                        isValid={formControls.country.valid}
                        changed={(event) => inputChangedHandler(event, 'country')}
                    />

                    <Input
                        elementType={formControls.zip.elementType}
                        elementConfig={formControls.zip.elementConfig}
                        label={formControls.zip.label}
                        value={formControls.zip.value}
                        touched={formControls.zip.touched}
                        isValid={formControls.zip.valid}
                        changed={(event) => inputChangedHandler(event, 'zip')}
                    />
                </div>
            </div>

            <Button disabled={!(formValid && props.items.length > 0)}>Order</Button>
        </form>
    )
}

export default CheckoutForm;