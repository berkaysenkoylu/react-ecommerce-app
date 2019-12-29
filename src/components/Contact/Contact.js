import React, { useState } from 'react';
import axiosContact from '../../axios-contact';

import classes from './Contact.module.scss';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import ErrorDialogue from '../ErrorDialogue/ErrorDialogue';
import checkValidity from '../../utility/formValidation';

const Contact = () => {
    const [formControls, setFormControls] = useState({
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
        message: {
            elementType: 'textarea',
            elementConfig: {
                rows: '4',
                cols: '50',
                placeholder: 'Message'
            },
            label: "Message",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [dialogue, setSDialogue] = useState({
        show: false,
        message: ''
    });

    const inputChangedHandler = (event, inputName) => {
        const copiedFormControls = {...formControls};

        const copiedFormControl = {...copiedFormControls[inputName]};

        copiedFormControl.value = event.target.value;
        copiedFormControl.touched = true;
        copiedFormControl.valid = checkValidity(event.target.value, copiedFormControl.validation);

        copiedFormControls[inputName] = copiedFormControl;

        // Set the validiity of the form
        let isValid = true;
        Object.keys(copiedFormControls).forEach(formControl => {
            isValid = isValid && copiedFormControls[formControl].valid;
        });

        setFormIsValid(isValid);
        setFormControls(copiedFormControls);
    }

    const onContactFormSubmitHandler = (event) => {
        event.preventDefault();

        let contactData = {
            name: formControls.name.value,
            email: formControls.email.value,
            message: formControls.message.value
        };

        axiosContact.post('', contactData).then(response => {
            setSDialogue(dialogue => {
                return {
                    show: true,
                    message: response.data.message
                }
            });
            resetFormFields();
        }).catch(error => {
            setSDialogue(dialogue => {
                return {
                    show: true,
                    message: error.response.data.message
                }
            });
        });
    }

    const onDialogueCloseHandler = (event) => {
        event.preventDefault();

        setSDialogue(dialogue => {
            return {
                show: false,
                message: ''
            }
        });
    }

    const resetFormFields = () => {
        const copiedFormControls = {...formControls};

        Object.keys(copiedFormControls).forEach(formControl => {
            let copiedFormControl = {...copiedFormControls[formControl]};

            copiedFormControl.value = '';
            copiedFormControl.valid = false;
            copiedFormControl.touched = false;

            copiedFormControls[formControl] = copiedFormControl;
        });

        setFormControls(copiedFormControls);
        setFormIsValid(false);
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
            <ErrorDialogue show={dialogue.show} errorMessage={dialogue.message} closed={onDialogueCloseHandler} />
            <div className={classes.Contact_bg}></div>
            <section className={classes.Contact}>
                <header className={classes.Contact__Header}>
                    <h2>Contact Us</h2>

                    <p>Want to get in touch with us? Just fill out the form below and we'll get back to you ASAP.</p>
                </header>

                <form className={classes.Contact__Form} onSubmit={onContactFormSubmitHandler}>
                    {formFields}

                    <Button disabled={!formIsValid}>Send</Button>
                </form>
            </section>
        </>
    );
}

export default Contact;