import React, { useState } from 'react';

import classes from './ProductShowcase.module.scss';
import ProductGroup from './ProductGroup/ProductGroup';
import PrevButton from './PrevButton/PrevButton';
import NextButton from './NextButton/NextButton';

const ProductShowcase = (props) => {
    const [translateValue, setTranslateValue] = useState(0);
    const [groupIndex, setGroupIndex] = useState(0);

    // TODO CHANGE THIS LATER
    let productGroupCount = 3;

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

    return (
        <section className={classes.ProductShowcase}>
            <header className={classes.ProductShowcaseHeader}>
                <h2>Featured Products</h2>
            </header>
            <div className={classes.ProductShowcaseWrapper}>
                <div className={classes.ProductShowcaseViewport} id="product-showcase-viewport">
                    <PrevButton clicked={onPrevButtonPressedHandler} groupIndex={groupIndex} />
                    <div className={classes.ProductGroups} style={{ transform: `translateX(${translateValue}px)`, transition: "transform 0.45s ease-out" }}>
                        <ProductGroup />

                        <ProductGroup />

                        <ProductGroup />
                    </div>
                    <NextButton clicked={onNextButtonPressedHandler} groupIndex={groupIndex} maxGroupCount={productGroupCount-1} />
                </div>
            </div>
        </section>
    )
}

export default ProductShowcase;