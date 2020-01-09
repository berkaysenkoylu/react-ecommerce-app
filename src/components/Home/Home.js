import React, { useState, useEffect } from 'react';
import axiosProducts from '../../axios-products';

import Slider from './Slider/Slider';
import BannerContact from './BannerContact/BannerContact';
import MosaicPromo from './MosaicPromo/MosaicPromo';
import ProductShowcase from './ProductShowcase/ProductShowcase';

const Home = (props) => {
    const [showcaseProducts, setShowcaseProducts] = useState([]);

    useEffect(() => {
        axiosProducts.get('').then(response => {
            let fetchedProducts = response.data.products;

            setShowcaseProducts(showcaseProducts => fetchedProducts.filter(p => p.showcase ? p : null));
        })
    }, []);

    return (
        <div>
            <Slider slideInterval={5} />
            
            <BannerContact />

            <MosaicPromo />

            <ProductShowcase showcaseProducts={showcaseProducts} />
        </div>
    )
}

export default Home;