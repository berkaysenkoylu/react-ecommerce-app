import React, { Component} from 'react';

import classes from './RangeSlider.module.scss';
import Knob from './Knob/Knob';

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        this.sliderRef = React.createRef(null);
        this.knobRef = React.createRef(null);
        this.positionX = 0;

        this.state = {
            dragStarted: false,
            isMouseButtonDown: false,
            posX: 0
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onMouseDownHandler);
        document.addEventListener('mouseup', this.onMouseUpHandler);
        document.addEventListener('mousemove', this.onMouseMoveHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onMouseDownHandler);
        document.removeEventListener('mouseup', this.onMouseUpHandler);
        document.removeEventListener('mousemove', this.onMouseMoveHandler);
    }

    onMouseDownHandler = (event) => {
        if(event.target === this.sliderRef.current) {
            this.positionX = this.findPosition(event);
            this.setState({
                dragStarted: true,
                isMouseButtonDown: true,
                posX: this.positionX
            });
        }
        else if(event.target === this.knobRef.current) {
            this.positionX = this.findPosition(event);
            this.setState({
                dragStarted: true,
                isMouseButtonDown: true,
                posX: this.positionX
            });
        }
        else {
            return;
        }
    }

    onMouseUpHandler = (event) => {
        // this.setState({
        //     isMouseButtonDown: false
        // });

        if(!this.state.dragStarted) {
            return;
        }
        
        this.positionX = this.findPosition(event);
        this.setState(oldState => {
            return {
                dragStarted: !oldState.dragStarted,
                isMouseButtonDown: !oldState.isMouseButtonDown,
                posX: this.positionX
        }});
    }

    onMouseMoveHandler = (event) => {
        if(!this.state.isMouseButtonDown) {
            return;
        }

        this.positionX = this.findPosition(event);
        this.setState({
            posX: this.positionX
        });
    }

    findPosition = (event) => {
        let rect = this.sliderRef.current.getBoundingClientRect();
        let rectWidth = Math.floor(rect.width);
        let leftPosPercentage = ((event.pageX - rect.left) / rectWidth) * 100;
        if(leftPosPercentage > 100) {
            leftPosPercentage = 100;
        }
        else if(leftPosPercentage < 0) {
            leftPosPercentage = 0;
        }

        return Math.floor(leftPosPercentage);
    }

    

    render() {
        let backFullStyle = {
            left: `${this.state.posX}%`,
            width: `${100 - this.state.posX}%`
        }

        return (
            <div className={classes.RangeSlider}>
                <Knob left={this.positionX} knobRef={this.knobRef} clicked={this.onMouseDownHandler} />
                <div className={classes.RangeSlider__Background} ref={this.sliderRef}></div>
                <div className={classes.RangeSlider__BackgroundFull} style={backFullStyle}></div>
            </div>
        )
    }
}

export default RangeSlider;


/*

import React, { useEffect, useRef, useState } from 'react';

import classes from './RangeSlider.module.scss';
import Knob from './Knob/Knob';

const RangeSlider = () => {
    const [mouseButtonHoldDown, setMouseButtonHoldDown] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [posX, setPosX] = useState(0);

    const sliderRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDownHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
        document.addEventListener('mousemove', onMouseMoveHandler);

        return () => {
            document.removeEventListener('mousedown', onMouseDownHandler);
            document.removeEventListener('mouseup', onMouseUpHandler);
            document.removeEventListener('mousemove', onMouseMoveHandler);
        };
    }, []);

    const onMouseDownHandler = (event) => {
        if(event.target !== sliderRef.current) {
            return;
        }
        setMouseButtonHoldDown(true);
    }

    const onMouseUpHandler = (event) => {
        if(event.target !== sliderRef.current) {
            return;
        }

        setMouseButtonHoldDown(false);
    }

    const onMouseMoveHandler = (event) => {
        if(mouseButtonHoldDown) {
            console.log("Hey listen")
        }
    }

    const findPosition = (event) => {
        let rect = sliderRef.current.getBoundingClientRect();
        let rectWidth = Math.floor(rect.width);
        let leftPosPercentage = ((event.pageX - rect.left) / rectWidth) * 100;

        return leftPosPercentage;
    }

    const backFullStyle = {
        left: '0%',
        width: '100%'
    }

    return (
        <div className={classes.RangeSlider}>
            <div className={classes.RangeSlider__Background}></div>
            <div className={classes.RangeSlider__BackgroundFull} style={backFullStyle} ref={sliderRef}></div>
        </div>
    )
}

export default RangeSlider;

*/