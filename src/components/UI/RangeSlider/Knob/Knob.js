import React/*,{ useState, useEffect, useCallback }*/ from 'react';

import classes from './Knob.module.scss';

const Knob = (props) => {
    // const [isDragged, setIsDragged] = useState(false);

    let left = props.left;

    // const handleDrag = useCallback(() => {
    //     if(isDragged) {
    //         // TODO
    //     }
    // }, [isDragged]);

    // const stopDrag = useCallback(() => {
    //     setIsDragged(false);
    // }, []);

    // useEffect(() => {
    //     document.addEventListener('mouseup', stopDrag);
    //     document.addEventListener('mousemove', handleDrag);
    //     return () => {
    //         document.removeEventListener('mousemove', handleDrag);
    //         document.removeEventListener('mouseup', stopDrag);
    //     }
    // }, [handleDrag, stopDrag]);

    // const dragToggle = () => {
    //     setIsDragged(true);
    // }

    // onMouseDown={dragToggle}

    let style = {
        left: `calc(${left}% - 1.25rem)`
    };

    return (
        <div className={classes.Knob} style={style} onMouseDown={props.clicked} ref={props.knobRef}></div>
    )
}

export default Knob;