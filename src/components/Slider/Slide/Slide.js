import React from 'react';

import classes from './Slide.module.scss';

const Slide = (props) => {

    let image = require(`../../../assets/images/${props.slideImage}`);

    const styles = {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%"
    };

    return (
        <div className={classes.Slide} style={styles} id="slide">
            <div className={classes.SlideContent}>
                <header>{props.slideHeading}</header>
                <p>{props.slideContent}</p>
                <div className={classes.SlideCta}>
                    <a href="/" className={classes.SlideButton}>{props.leftButton}</a>
                    <a href="/" className={classes.SlideButton}>{props.rightButton}</a>
                </div>
            </div>
        </div>
    )
}

export default Slide;