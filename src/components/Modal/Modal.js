import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

const Modal = (props) => {
    const [modalClasses, setModalClasses] = useState([classes.ModalContainer]); // KEEP IT OR LEAVE IT

    useEffect(() => {
        setModalClasses([classes.ModalContainer]); // KEEP IT OR LEAVE IT
    }, [props.show]);

    let style = {
        backgroundImage: `url(${props.product.imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    };

    const closeModalHandler = () => {
        props.closed();

        setModalClasses([classes.ModalContainer, classes.ModalContainer__Closed]); // KEEP IT OR LEAVE IT
    }

    return (
        ReactDOM.createPortal(
            props.show ? (
                <div className={modalClasses.join(' ')}>
                    <Backdrop show={props.show} clicked={closeModalHandler} />
                    <div className={classes.Modal}>
                        <div className={classes.ModalClose} onClick={closeModalHandler}></div>

                        <div className={classes.ModalContent}>
                            <div className={classes.ModalContent__Image} style={style}></div>

                            <div className={classes.ModalContent__Text}>
                                <h2>{props.product.name}</h2>
                                <p>{props.product.description}</p>
                                <span>${props.product.price}</span>
                                <div className={classes.ModalContent__CallToAction}>
                                    <Link to={`/products/${props.product._id}`}>More info</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : null,
            document.getElementById('modal-root')
        )
    );
}  

export default Modal;