import React, { useState, useEffect } from 'react';

import classes from './Slider.module.scss';
import LeftArrow from './LeftArrow/LeftArrow';
import RightArrow from './RightArrow/RightArrow';
import Slide from './Slide/Slide';

const Slider = (props) => {
    const [slides, setSlides] = useState([
        {
            slideHeader: 'Christmas Sale is upon us!',
            slideContent: 'Don\'t miss out opportunities like up to 75% discounts!',
            slideButtonLeft: 'Buy',
            slideButtonRight: 'Explore',
            slideBackgroundImage: 'slide1.jpg'
        },
        {
            slideHeader: 'Winter Sale',
            slideContent: 'One of the most exciting time of the year has arrived!',
            slideButtonLeft: 'Discover',
            slideButtonRight: 'Shop',
            slideBackgroundImage: 'slide2.jpg'
        },
        {
            slideHeader: 'Literacy Sale',
            slideContent: 'Explore new universes within the comfort of your home!',
            slideButtonLeft: 'Read',
            slideButtonRight: 'Improve',
            slideBackgroundImage: 'slide3.jpg'
        }
    ]);
    // const [intervalObject, setIntervalObject] = useState(null);
    // const [slideSettings, setSlideSettings] = useState({
    //     index: 1,
    //     transitionDuration: 0
    // });
    const [currentIndex, setCurrentIndex] = useState(1);
    const [transitionDuration, setTransitionDuration] = useState(0);

    useEffect(() => {
        // Copy the first and the last slides
        let copiedSlides = copySlides(slides);
        
        setSlides(copiedSlides);
        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     startSlideInterval();
    // }, []);


    const copySlides = (slides) => {
        const length = slides.length;
        const last = Object.assign({}, slides[length - 1]);
        const first = Object.assign({}, slides[0]);

        return [last, ...slides, first];
    }

    // const startSlideInterval = () => {
    //     if(props.slideInterval) {
    //         setIntervalObject(setInterval(() => indexIncrementHandler(), props.slideInterval * 1000));
    //     }
    // }

    // const clearSlideInterval = () => {
    //     if(intervalObject) {
    //         clearInterval(intervalObject);
    //     }
    // }
    
    // const getSlideWidth = () => {
    //     return document.getElementById('slide').clientWidth;
    // }

    const indexIncrementHandler = () => {
        let maxIndex = slides.length - 1;
        setCurrentIndex(currentIndex => currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
        if(transitionDuration === 0) {
            setTransitionDuration(0.4);
        }
    }

    const indexDecrementHandler = () => {
        let maxIndex = slides.length - 1;
        setCurrentIndex(currentIndex => currentIndex - 1 < 0 ? maxIndex : currentIndex - 1);
        if(transitionDuration === 0) {
            setTransitionDuration(0.4);
        }
    }

    // const setActiveIndex = (newIndex) => {
    //     if(newIndex >= 0 && newIndex < slides.length - 1) {
    //         setSlideSettings({
    //             index: newIndex,
    //             transitionDuration: 0.4
    //         })
    //     }
    // }

    const transitionEndHandler = () => {
        const length = slides.length;
        
        if(currentIndex === 0) {
            setCurrentIndex(length - 2);
            setTransitionDuration(0);
        } else if (currentIndex === length - 1) {
            setCurrentIndex(1);
            setTransitionDuration(0);
        }

        // clearSlideInterval();
        // startSlideInterval();
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

    // Calculate the translation amount here
    let translateValue = 0;
    translateValue = -100 * currentIndex / slides.length ;
    return (
        <div className={classes.Slider}>
            <div className={classes.SliderWrap} 
                style={{ width: slides.length * 100 + "%", transform: `translateX(${translateValue}%)`, transition: `transform ${transitionDuration}s ease-out` }}
                onTransitionEnd={transitionEndHandler}
            >
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
