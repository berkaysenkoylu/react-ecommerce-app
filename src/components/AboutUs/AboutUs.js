import React from 'react';

import image from '../../assets/images/about_us.jpg';
import classes from './AboutUs.module.scss';

const AboutUs = () => {

    return (
        <article className={classes.AboutUs}>
            <header className={classes.AboutUs__Heading}>
                <h2>About Us</h2>
            </header>

            <div className={classes.AboutUs__Content}>
                <div className={classes.AboutUsContent__Image}>
                    <img src={image} alt="about_us" />
                </div>

                <div className={classes.AboutUsContent__Text}>
                    <p>
                        There's a story behind every product. It's that of an emerging designer just introducing his/her work to the world; 
                        artisans working collaboratively in a low income country; or a seasoned artist crafting each of his pieces by hand. 
                        With help of our customers, we're building a community of passionate people who love our products and connect with 
                        the stories behind them. If you want to indulge yourself with creative design, have a look at the services/products
                        we provide! And if and when you have a question, feedback or anything else, just get in touch with us! We would love to
                        hear from you!
                    </p>
                </div>
            </div>
        </article>
    )
}

export default AboutUs;