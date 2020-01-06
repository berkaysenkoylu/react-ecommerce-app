import React, { useState } from 'react';

import classes from './ChatInput.module.scss';

const ChatInput = (props) => {
    const[value, setValue] = useState("");

    const onEnterButtonPressed = (event) => {
        if(event.key === 'Enter') {
            props.messageSent(value);

            setValue(value => "");
        }
    }

    const onInputChanged = (event) => {
        event.preventDefault();

        let inputVal = event.target.value;

        setValue(value => inputVal);
    }

    return (
        <input type="text" className={classes.ChatInput} value={value} onChange={onInputChanged} onKeyPress={onEnterButtonPressed} />
    )
}

export default ChatInput;