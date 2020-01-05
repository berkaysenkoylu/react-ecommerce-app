import React from 'react';

import svg from '../../assets/images/sprite.svg';
import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={classes.Footer}>
            <section className={classes.LinkContainer}>
                <div className={classes.NavLinks}>
                    <ul className={classes.NavLinks__Container}>
                        <li className={classes.NavLinks__Link}>
                            Home
                        </li>
                        <li className={classes.NavLinks__Link}>
                            Shop
                        </li>
                        <li className={classes.NavLinks__Link}>
                            Career
                        </li>
                        <li className={classes.NavLinks__Link}>
                            Terms
                        </li>
                        <li className={classes.NavLinks__Link}>
                            Privacy
                        </li>
                    </ul>
                </div>

                <div className={classes.SocialMediaLinks}>
                    <h2 className={classes.SocialMediaLinks__Header}>Follow us</h2>
                    <div className={classes.SocialMediaLinks__Container}>
                        <span className={classes.SocialMediaLink}>
                            <svg className={classes.SocialMediaLink__Icon}>
                                <use xlinkHref={`${svg}#icon-facebook`}></use>
                            </svg>
                        </span>
                        <span className={classes.SocialMediaLink}>
                            <svg className={classes.SocialMediaLink__Icon}>
                                <use xlinkHref={`${svg}#icon-twitter`}></use>
                            </svg>
                        </span>
                        <span className={classes.SocialMediaLink}>
                            <svg className={classes.SocialMediaLink__Icon}>
                                <use xlinkHref={`${svg}#icon-pinterest`}></use>
                            </svg>
                        </span>
                        <span className={classes.SocialMediaLink}>
                            <svg className={classes.SocialMediaLink__Icon}>
                                <use xlinkHref={`${svg}#icon-instagram`}></use>
                            </svg>
                        </span>
                    </div>
                </div>
            </section>

            <section className={classes.Copyright}>
                <p className={classes.Copyright__Text}>
                    &copy; 2020 Berkay Senkoylu
                </p>
            </section>
        </footer>
    )
}

export default Footer;