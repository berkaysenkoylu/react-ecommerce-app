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
            {props.adminOnline ? 
                <>
                    <div className={classes.ChatWindow__Messages}>
                        {props.messages.length > 0 ? props.messages.map((message, i) => {
                            return <p key={i}><strong>{message.from === 'admin' ? message.from : props.username}:</strong> {message.message}</p>
                        }) : null}
                    </div>

                    <input 
                        type="text"
                        className={classes.ChatWindow__Input}
                        onKeyPress={(event) => onEnterButtonPressed(event)}
                        onChange={(event) => onInputChange(event)}
                        value={inputValue}
                    />
                </> : <p className={classes.AdminOffline}>Admin is currently offline!</p>}
        </div>
    )
}

export default ChatWindow;