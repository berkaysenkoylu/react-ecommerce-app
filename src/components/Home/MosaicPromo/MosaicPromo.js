import React from 'react';

import classes from './MosaicPromo.module.scss';
import Promo from './Promo/Promo';

const MosaicPromo = (props) => {
    let promos = [
        {
            promoTitle: "Christmas Sale",
            promoText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ipsam distinctio incidunt quos repellat voluptate minus laborum qui sunt libero.",
            promoButton: "Shop Now",
            promoImage: "christmas.jpg"
        },
        {
            promoTitle: "Back to School Sale",
            promoText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ipsam distinctio incidunt quos repellat voluptate minus laborum qui sunt libero.",
            promoButton: "Read More",
            promoImage: "school.jpg"
        },
        {
            promoTitle: "Minimalism",
            promoText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ipsam distinctio.",
            promoButton: "Shop Gifts",
            promoImage: "minimalism.jpg"
        },
        {
            promoTitle: "Simple Living",
            promoText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ipsam distinctio.",
            promoButton: "Simple Info",
            promoImage: "simple.jpg"
        },
        {
            promoTitle: "Play Hardcore",
            promoText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ipsam distinctio.",
            promoButton: "Hard Info",
            promoImage: "hard.jpg"
        }
    ];

    let pageContent = promos.map(promo => {
        return <Promo 
            key={promo.promoTitle} 
            title={promo.promoTitle} 
            text={promo.promoText} 
            backImage={promo.promoImage} 
            button={promo.promoButton}/>;
    })


    return (
        <section className={classes.MosaicPromo}>
            {pageContent}
        </section>
    )
}

export default MosaicPromo;