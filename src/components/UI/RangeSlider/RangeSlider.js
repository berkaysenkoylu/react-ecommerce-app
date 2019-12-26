import React, { Component} from 'react';

import classes from './RangeSlider.module.scss';
import Knob from './Knob/Knob';

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        this.sliderRef = React.createRef(null);
        this.knobRef = React.createRef(null);
        this.knobRef2 = React.createRef(null);
        this.position1 = 0;
        this.position2 = 100;

        this.state = {
            dragStarted: false,
            isMouseButtonDown: false,
            pos1: 0,
            pos2: 100,
            selectedKnobId: null
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

    getClosestKnob = (mousePos) => {
        let selected = '';
        if(Math.abs(mousePos - this.state.pos1) < Math.abs(mousePos - this.state.pos2)) {
            selected = 'knob1';
        }
        else {
            selected = 'knob2';
        }

        return selected;
    }

    onMouseDownHandler = (event) => {
        if(event.target === this.sliderRef.current) {
            // We need to find which knob is the closest to the mouse click
            let mouseClickPos = ((event.pageX) / this.sliderRef.current.getBoundingClientRect().width) * 100;
            let selected = this.getClosestKnob(mouseClickPos);

            if(selected === 'knob1') {
                this.position1 = this.findPosition(event);
            }
            else {
                this.position2 = this.findPosition(event);
            }
            let knobId = '';
            if(this.knobRef.current.id === selected) {
                knobId = this.knobRef.current.id;
            }
            else {
                knobId = this.knobRef2.current.id;
            }

            this.setState({
                dragStarted: true,
                isMouseButtonDown: true,
                pos1: this.position1,
                pos2: this.position2,
                selectedKnobId: knobId
            });
        }
        else if(event.target === this.knobRef.current) {
            this.position1 = this.findPosition(event);
            this.setState({
                dragStarted: true,
                isMouseButtonDown: true,
                pos1: this.position1,
                pos2: this.position2,
                selectedKnobId: this.knobRef.current.id
            });
        }
        else if(event.target === this.knobRef2.current) {
            this.position2 = this.findPosition(event);
            this.setState({
                dragStarted: true,
                isMouseButtonDown: true,
                pos1: this.position1,
                pos2: this.position2,
                selectedKnobId: this.knobRef2.current.id
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
        
        if(this.state.selectedKnobId === 'knob1') {
            this.position1 = this.findPosition(event);
        }
        else if(this.state.selectedKnobId === 'knob2') {
            this.position2 = this.findPosition(event);
        }

        this.setState(oldState => {
            return {
                dragStarted: !oldState.dragStarted,
                isMouseButtonDown: !oldState.isMouseButtonDown,
                pos1: this.position1,
                pos2: this.position2,
                selectedKnobId: null
        }});
    }

    onMouseMoveHandler = (event) => {
        if(!this.state.isMouseButtonDown) {
            return;
        }

        if(this.state.selectedKnobId === 'knob1') {
            this.position1 = this.findPosition(event);
        }
        else if(this.state.selectedKnobId === 'knob2') {
            this.position2 = this.findPosition(event);
        }

        this.setState({
            pos1: this.position1,
            pos2: this.position2
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

        let leftMost = this.state.pos1 < this.state.pos2 ? this.state.pos1 : this.state.pos2;
        let rightMost = this.state.pos1 > this.state.pos2 ? this.state.pos1 : this.state.pos2;

        let backFullStyle = {
            left: `${leftMost}%`,
            width: `${rightMost - leftMost}%`
        }

        return (
            <div className={classes.RangeSliderContainer}>
                <div>
                    ${leftMost * (this.props.max / 100)} - ${rightMost * (this.props.max / 100)}
                </div>
                <div className={classes.RangeSlider}>
                    <Knob left={this.state.pos1} knobRef={this.knobRef} clicked={this.onMouseDownHandler} id={'knob1'} />
                    <div className={classes.RangeSlider__Background} ref={this.sliderRef}></div>
                    <div className={classes.RangeSlider__BackgroundFull} style={backFullStyle}></div>
                    <Knob left={this.state.pos2} knobRef={this.knobRef2} clicked={this.onMouseDownHandler} id={'knob2'} />
                </div>
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