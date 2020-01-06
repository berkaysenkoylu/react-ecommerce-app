import React from 'react';

import classes from './ChatWindow.module.scss';

const ChatWindow = (props) => {
    return (
        <div className={classes.ChatWindow}>
            <h2>
                {`to ${props.username}`}
            </h2>

            <div className={classes.ChatMessagesWrapper}>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;