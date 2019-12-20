import React from 'react';

import Slider from '../Slider/Slider';
import BannerContact from '../BannerContact/BannerContact';
import MosaicPromo from '../MosaicPromo/MosaicPromo';
import ProductShowcase from '../ProductShowcase/ProductShowcase';

const Home = (props) => {
    return (
        <div>
            <Slider />
            
            <BannerContact />

            <MosaicPromo />

            <ProductShowcase />

            <div>
                MORE...
            </div>
        </div>
    )
}

export default Home;