import React from 'react';

import classes from './ChatWindow.module.scss';

const ChatWindow = (props) => {
    

    let chatContent = null;
    if(props.userSocket && props.messages[props.userSocket]) {
        chatContent = props.messages[props.userSocket].map((chatMessage, i) => {
            return <p key={i}><strong>{chatMessage.from !== 'admin' ? props.username : chatMessage.from}</strong>: {chatMessage.message}</p>
        })
    }

    return (
        <div className={classes.ChatWindow}>
            <h2>
                {`to ${props.username}`}
            </h2>

            <div className={classes.ChatMessagesWrapper}>
                <div>
                    {chatContent}
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;