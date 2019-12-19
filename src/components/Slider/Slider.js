import React, { useState } from 'react';

import classes from './Slider.module.scss';
import LeftArrow from './LeftArrow/LeftArrow';
import RightArrow from './RightArrow/RightArrow';
import Slide from './Slide/Slide';

const Slider = () => {
    const [slides, setSlides] = useState([
        {
            slideHeader: 'Christmas Sale is upon us!',
            slideContent: 'Don\'t miss out opportunities like up to 75% discounts!',
            slideButtonLeft: 'Buy now',
            slideButtonRight: 'SBR',
            slideBackgroundImage: 'slide1.jpg'
        },
        {
            slideHeader: 'Slide 2',
            slideContent: 'Slide 2 content will be here',
            slideButtonLeft: 'Buy now',
            slideButtonRight: 'SBR',
            slideBackgroundImage: 'slide2.jpg'
        },
        {
            slideHeader: 'Slide 3',
            slideContent: 'Slide 3 content will be here',
            slideButtonLeft: 'Buy now',
            slideButtonRight: 'SBR',
            slideBackgroundImage: 'slide3.jpg'
        }
    ]);
    const [slideSettings, setSlideSettings] = useState({
        currentIndex: 0,
        translateValue: 0
    });

    const getSlideWidth = () => {
        return document.getElementById('slide').clientWidth;
    }

    const indexIncrementHandler = () => {
        let maxIndex = slides.length - 1;
        // setCurrentIndex(currentIndex => currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
        let index = slideSettings.currentIndex + 1 > maxIndex ? 0 : slideSettings.currentIndex + 1;
        let translateX = -index * getSlideWidth();
        setSlideSettings({
            currentIndex: index,
            translateValue: translateX
        });
    }

    const indexDecrementHandler = () => {
        let maxIndex = slides.length - 1;
        // setCurrentIndex(currentIndex => currentIndex - 1 < 0 ? maxIndex : currentIndex - 1);
        let index = slideSettings.currentIndex - 1 < 0 ? maxIndex : slideSettings.currentIndex - 1;
        let translateX = -index * getSlideWidth();
        setSlideSettings({
            currentIndex: index,
            translateValue: translateX
        });
    }

    let content = slides.map((slide, index) => {
        return <Slide 
            key={index}
            slideHeading={slide.slideHeader}
            slideContent={slide.slideContent}
            slideImage={slide.slideBackgroundImage}
            leftButton={slide.slideButtonLeft}
            rightButton={slide.slideButtonRight}
        />
    });

    return (
        <div className={classes.Slider}>
            <div className={classes.SliderWrap} style={{ transform: `translateX(${slideSettings.translateValue}px)`, transition: "transform 0.45s ease-out" }}>
                {content}
            </div>
            <LeftArrow decrementIndex={indexDecrementHandler} />
            <RightArrow incrementIndex={indexIncrementHandler} />
        </div>
    )
}

export default Slider;

/*
import React, { useState } from 'react';

import classes from './Slider.module.scss';
import LeftArrow from './LeftArrow/LeftArrow';
import RightArrow from './RightArrow/RightArrow';
import Slide from './Slide/Slide';

const Slider = () => {
    const [slides, setSlides] = useState([
        {
            slideHeader: 'Slide 1',
            slideContent: 'Slide 1 content will be here',
            slideButtonLeft: 'Buy now',
            slideButtonRight: 'SBR',
            slideBackgroundImage: 'slide1.jpg'
        },
        {
            slideHeader: 'Slide 2',
            slideContent: 'Slide 2 content will be here',
            slideButtonLeft: 'Buy now',
            slideButtonRight: 'SBR',
            slideBackgroundImage: 'slide2.jpg'
        },
        {
            slideHeader: 'Slide 3',
            slideContent: 'Slide 3 content will be here',
            slideButtonLeft: 'Buy now',
            slideButtonRight: 'SBR',
            slideBackgroundImage: 'slide3.jpg'
        }
    ]);
    const [slideSettings, setSlideSettings] = useState({
        currentIndex: 0,
        translateValue: 0
    });

    const getSlideWidth = () => {
        return document.getElementById('slide').clientWidth;
    }

    const indexIncrementHandler = () => {
        let maxIndex = slides.length - 1;
        // setCurrentIndex(currentIndex => currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
        let index = slideSettings.currentIndex + 1 > maxIndex ? 0 : slideSettings.currentIndex + 1;
        let translateX = -index * getSlideWidth();
        setSlideSettings({
            currentIndex: index,
            translateValue: translateX
        });
    }

    const indexDecrementHandler = () => {
        let maxIndex = slides.length - 1;
        // setCurrentIndex(currentIndex => currentIndex - 1 < 0 ? maxIndex : currentIndex - 1);
        let index = slideSettings.currentIndex - 1 < 0 ? maxIndex : slideSettings.currentIndex - 1;
        let translateX = index * getSlideWidth();
        setSlideSettings({
            currentIndex: index,
            translateValue: translateX
        });
    }

    let content = slides.map((slide, index) => {
        return <Slide 
            key={index}
            slideHeading={slide.slideHeader}
            slideContent={slide.slideContent}
            slideImage={slide.slideBackgroundImage} 
        />
    });

    return (
        <div className={classes.Slider}>
            <div className={classes.SliderWrap} style={{ transform: `translateX(${slideSettings.translateValue}px)`, transition: "transform 0.45s ease-out" }}>
                {content}
            </div>
            <LeftArrow decrementIndex={indexDecrementHandler} />
            <RightArrow incrementIndex={indexIncrementHandler} />
        </div>
    )
}

export default Slider;

*/
