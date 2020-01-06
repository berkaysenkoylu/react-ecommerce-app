import React, { useState } from 'react';

import classes from './ChatWindow.module.scss';

const ChatWindow = (props) => {
    const [inputValue, setInputValue] = useState("");

    const onEnterButtonPressed = (event) => {
        if(event.key === 'Enter') {
            props.messageSent(inputValue);

            setInputValue(inputValue => "");
        }
    }

    const onInputChange = (event) => {
        let inputVal = event.target.value;
        setInputValue(inputValue => inputVal);
    }

    return (
        <div className={classes.ChatWindow}>
            <div className={classes.ChatWindow__Messages}>

            </div>

            <input 
                type="text"
                className={classes.ChatWindow__Input}
                onKeyPress={(event) => onEnterButtonPressed(event)}
                onChange={(event) => onInputChange(event)}
                value={inputValue}
            />
        </div>
    )
}

export default ChatWindow;