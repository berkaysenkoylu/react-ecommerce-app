import React from 'react';

import classes from './Promo.module.scss';
import Button from '../../UI/Button/Button';

const Promo = (props) => {

    let image = require(`../../../assets/images/${props.backImage}`);

    const styles = {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 70%"
    };

    return (
        <article className={classes.Promo} style={styles}>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <Button>{props.button}</Button>
        </article>
    )
}

export default Promo;