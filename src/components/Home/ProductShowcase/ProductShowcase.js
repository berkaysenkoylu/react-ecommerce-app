import React, { useState } from 'react';

import classes from './ProductShowcase.module.scss';
import ProductGroup from './ProductGroup/ProductGroup';
import PrevButton from './PrevButton/PrevButton';
import NextButton from './NextButton/NextButton';

const ProductShowcase = (props) => {
    const [translateValue, setTranslateValue] = useState(0);
    const [groupIndex, setGroupIndex] = useState(0);

    const onPrevButtonPressedHandler = () => {
        setTranslateValue(translateValue => translateValue + getViewportWidth());
        setGroupIndex(groupIndex => groupIndex - 1 < 0 ? 0 : groupIndex - 1);
    }

    const onNextButtonPressedHandler = () => {
        setTranslateValue(translateValue => translateValue - getViewportWidth());
        setGroupIndex(groupIndex => groupIndex + 1 > productGroupCount - 1 ? productGroupCount - 1 : groupIndex + 1);
    }

    const getViewportWidth = () => {
        return document.getElementById('product-showcase-viewport').clientWidth;
    }

    let totalCount = 0;
    let productGroupCount = 3;
    let productGroups = [];

    if(props.showcaseProducts) {
        totalCount = props.showcaseProducts.length;
        productGroupCount = Math.floor(totalCount / 4) + 1;
        let index = 0;
        for(let g = 0; g < productGroupCount; g++) {
            let start = index;
            let end = index + 4 > totalCount ? totalCount : index + 4;
            
            productGroups.push(props.showcaseProducts.slice(start, end));

            index += 4;
        }

        productGroups = productGroups.map((group, index) => {
            return <ProductGroup key={index} hasLink={index === productGroupCount - 1 ? true : false} group={group} />
        });
    }

    return (
        <section className={classes.ProductShowcase}>
            <header className={classes.ProductShowcaseHeader}>
                <h2>Featured Products</h2>
            </header>
            <div className={classes.ProductShowcaseWrapper}>
                <div className={classes.ProductShowcaseViewport} id="product-showcase-viewport">
                    <PrevButton clicked={onPrevButtonPressedHandler} groupIndex={groupIndex} />
                    <div className={classes.ProductGroups} style={{ transform: `translateX(${translateValue}px)`, transition: "transform 0.45s ease-out" }}>
                        {productGroups}
                    </div>
                    <NextButton clicked={onNextButtonPressedHandler} groupIndex={groupIndex} maxGroupCount={productGroupCount-1} />
                </div>
            </div>
        </section>
    )
}

export default ProductShowcase;