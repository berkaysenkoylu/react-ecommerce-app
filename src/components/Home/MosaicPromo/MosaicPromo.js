import React from 'react';

import classes from './MosaicPromo.module.scss';
import Promo from './Promo/Promo';

const MosaicPromo = (props) => {
    let promos = [
        {
            promoTitle: "Christmas Sale",
            promoText: "We are in that time of the year again! Explore what we offer!",
            promoButton: "Discover",
            promoImage: "christmas.jpg"
        },
        {
            promoTitle: "Back to School Sale",
            promoText: "Discover our big school sale!",
            promoButton: "Explore",
            promoImage: "school.jpg"
        },
        {
            promoTitle: "Minimalism",
            promoText: "Read more about this new trend, and see related products.",
            promoButton: "Shop Gifts",
            promoImage: "minimalism.jpg"
        },
        {
            promoTitle: "Simple Living",
            promoText: "Simplicity's strength is not to be underestimated!",
            promoButton: "Simple",
            promoImage: "simple.jpg"
        },
        {
            promoTitle: "Play Hardcore",
            promoText: "Products for hardcore people.",
            promoButton: "Hard",
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