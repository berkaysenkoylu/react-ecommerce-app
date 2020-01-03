import React, { useState, useRef, useEffect } from 'react';

import classes from './MutateProduct.module.scss';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import checkValidity from '../../../utility/formValidation';
import CheckBox from '../../UI/CheckBox/CheckBox';

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

const MutateProduct = (props) => {
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
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Price'
            },
            label: "Price",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                rows: '4',
                cols: '50',
                placeholder: 'Description'
            },
            label: "Description",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        image: {
            elementType: 'input',
            elementConfig: {
                type: 'file',
                placeholder: 'Image'
            },
            label: "Image",
            validation: {
                required: true
            },
            value: {},
            valid: false,
            selectedFile: '',
            showcaseImage: null
        },
        showcase: {
            value: false,
            valid: true
        },
        category: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: "Miscellaneous", displayValue: "Miscellaneous" },
                    { value: "Sports", displayValue: "Sports" },
                    { value: "Clothing", displayValue: "Clothing" },
                ]
            },

            value: "Miscellaneous",
            valid: true
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [mode, setMode] = useState('add');
    const [editedProduct, setEditedProduct] = useState(null);

    useEffect(() => {
        if(props.location.search !== '' && props.location.search.length > 0) {
            let params = {};
            props.location.search.slice(1).split('&').forEach(el => {
                params[el.split('=')[0]] = el.split('=')[1];
            });
            
            if(params.edit) {
                setMode(params['edit'] === 'true' ? 'edit' : 'add');

                let product = props.productList.find(p => p._id === params.id);

                setEditedProduct(product);

                // Pre-populate the form
                let copiedFormControls = {...formControls};
                Object.keys(copiedFormControls).forEach(ctrl => {
                    let copiedFormControl = { ...copiedFormControls[ctrl] };

                    if(ctrl !== 'image') {
                        copiedFormControl.value = product[ctrl];
                    }
                    copiedFormControl.valid = true;

                    copiedFormControls[ctrl] = copiedFormControl;
                });

                setFormControls(copiedFormControls);
                setIsFormValid(true);
            }
        }
        // eslint-disable-next-line
    }, [props]);

    let fileInput = useRef(null);

    const inputChangedHandler = (event, inputName) => {
        const copiedFormControls = {...formControls};
        const copiedFormControl = {...formControls[inputName]};
        
        if(inputName === 'image') {
            let type = fileInput.current.files[0].type;
            
            if(MIME_TYPE_MAP[type]) {
                copiedFormControl.selectedFile = fileInput.current.files[0].name;

                generateBase64FromImage(fileInput.current.files[0]).then(b64 => {
                    copiedFormControl.showcaseImage = b64;
                    copiedFormControl.value = fileInput.current.files[0];
                    copiedFormControl.valid = true;
                    copiedFormControls[inputName] = copiedFormControl;

                    // Check if form is valid
                    let formValid = checkFormValidation(copiedFormControls);

                    setIsFormValid(formValid);

                    setFormControls(copiedFormControls);
                }).catch(e => {
                    console.log(e);
                    copiedFormControl.value = {};
                    copiedFormControl.showcaseImage = null;
                    copiedFormControls[inputName] = copiedFormControl;

                    // Check if form is valid
                    let formValid = checkFormValidation(copiedFormControls);

                    setIsFormValid(formValid);

                    setFormControls(copiedFormControls);
                });
            }
            else {
                copiedFormControl.showcaseImage = null;
                copiedFormControl.selectedFile = '';
                copiedFormControl.value = {};
                copiedFormControl.valid = false;
                copiedFormControls[inputName] = copiedFormControl;

                // Check if form is valid
                let formValid = checkFormValidation(copiedFormControls);

                setIsFormValid(formValid);

                setFormControls(copiedFormControls);
            }
        }
        else {
            copiedFormControl.value = event.target.value;

            if(inputName !== 'category') {
                let isValid = checkValidity(event.target.value, copiedFormControl.validation);
                copiedFormControl.valid = isValid;
                copiedFormControl.touched = true;
            }

            copiedFormControls[inputName] = copiedFormControl;

            // Check if form is valid
            let formValid = checkFormValidation(copiedFormControls);

            setIsFormValid(formValid);
            setFormControls(copiedFormControls);
        }
    }

    const onCheckboxClickedHandler = (event) => {
        event.preventDefault();

        const copiedFormControls = { ...formControls };

        const copiedShowcase = { ...copiedFormControls.showcase };

        copiedShowcase.value = !copiedShowcase.value;

        copiedFormControls.showcase = copiedShowcase;

        setFormControls(copiedFormControls);
    }

    const onFormSubmitHandler = (event) => {
        event.preventDefault();

        if (mode === 'edit') {
            if(formControls.image.value && formControls.image.value !== {}) {
                // This means that user wants to upload a new image
                let formData = new FormData();
                formData.append('name', formControls.name.value);
                formData.append('file', formControls.image.value);
                formData.append('price', formControls.price.value);
                formData.append('description', formControls.description.value);
                formData.append('showcase', formControls.showcase.value);
                formData.append('category', formControls.category.value);

                props.addProduct({ mode: 'edit', formData, id: editedProduct._id });  
            }
            else {
                // This means that user doesn't want to change the image
                
                // let productData = {
                //     name: formControls.name.value,
                //     price: formControls.price.value,
                //     description: formControls.description.value
                // };

                let formData = new FormData();
                formData.append('name', formControls.name.value);
                formData.append('price', formControls.price.value);
                formData.append('description', formControls.description.value);
                formData.append('showcase', formControls.showcase.value);
                formData.append('category', formControls.category.value);

                props.addProduct({ mode: 'edit', formData, id: editedProduct._id });  
            }
        }
        else {
            let formData = new FormData();
            formData.append('name', formControls.name.value);
            formData.append('file', formControls.image.value);
            formData.append('price', formControls.price.value);
            formData.append('description', formControls.description.value);
            formData.append('showcase', formControls.showcase.value);
            formData.append('category', formControls.category.value);

            props.addProduct({ mode: 'add', formData });
        }
    }

    const checkFormValidation = (formControls) => {
        let formValid = true;
        Object.keys(formControls).forEach(ctrl => {
            formValid = formValid && formControls[ctrl].valid;
        });

        return formValid;
    }

    const generateBase64FromImage = (imageFile) => {
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
            reader.onload = e => resolve(e.target.result);
            reader.onerror = err => reject(err);
        });

        reader.readAsDataURL(imageFile);
        return promise;
    };

    let pageContent = null;
    if(props.loading) {
        pageContent = <Spinner strokeWidth={3} />
    } else {
        pageContent = (
            <>
                <h2 className={classes.MutateProduct__Heading}>
                    { mode === 'add' ? 'Add a New Product' : 'Edit the Product'}
                </h2>
                <form onSubmit={onFormSubmitHandler} className={classes.MutateProduct__Form}>
                    <Input 
                        elementType={formControls.name.elementType}
                        elementConfig={formControls.name.elementConfig}
                        label={formControls.name.label}
                        value={formControls.name.value}
                        touched={formControls.name.touched}
                        isValid={formControls.name.valid}
                        changed={(event) => inputChangedHandler(event, 'name')}
                    />
                    <div className={classes.FileUpload}>
                        {formControls.image.showcaseImage ? <img src={formControls.image.showcaseImage} alt="showcase" className={classes.FileUpload__Image} /> : null}
                        <div className={classes.FileUpload__Input}>
                            <input type="file" ref={fileInput} onChange={(event) => inputChangedHandler(event, 'image')} id="file-upload" />
                            <label htmlFor="file-upload">Image</label>
                            <span>{formControls.image.selectedFile !== "" ? `Selected: ${formControls.image.selectedFile}` : 'No file selected yet'}</span>
                        </div>
                    </div>

                    <div className={classes.ShowcaseFormField}>
                        <CheckBox checked={formControls.showcase.value} clicked={onCheckboxClickedHandler} /> <span>Is showcase</span>
                        <div style={{marginLeft: 'auto'}}>
                            <Input 
                                elementType={formControls.category.elementType}
                                elementConfig={formControls.category.elementConfig}
                                value={formControls.category.value}
                                changed={(event) => inputChangedHandler(event, 'category')}
                            />
                        </div>
                    </div>

                    <Input 
                        elementType={formControls.price.elementType}
                        elementConfig={formControls.price.elementConfig}
                        label={formControls.price.label}
                        value={formControls.price.value}
                        touched={formControls.price.touched}
                        isValid={formControls.price.valid}
                        changed={(event) => inputChangedHandler(event, 'price')}
                    />
                    <Input 
                        elementType={formControls.description.elementType}
                        elementConfig={formControls.description.elementConfig}
                        label={formControls.description.label}
                        value={formControls.description.value}
                        touched={formControls.description.touched}
                        isValid={formControls.description.valid}
                        changed={(event) => inputChangedHandler(event, 'description')}
                    />
                    <Button disabled={!isFormValid}>
                        { mode === 'add' ? 'Add' : 'Update'}
                    </Button>
                </form>
            </>
        );
    }

    return (
        <>
            <div className={classes.MutateProductBackground}></div>
            <div className={classes.MutateProduct}>
                {pageContent}
            </div>
        </>
    )
}

export default MutateProduct;