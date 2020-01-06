import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import svg from '../../assets/images/sprite.svg';
import classes from './UserChat.module.scss';
import ChatWindow from './ChatWindow/ChatWindow';

const UserChat = (props) => {
    const [openChatWindow, setOpenChatWindow] = useState(false);
    let socket = useRef();

    useEffect(() => {
        if(openChatWindow) {
            socket.current = io('http://localhost:8000/', {
                query: `username=${props.username}&userId=${props.userId}`
            });
        }
        
    }, [props.userId, props.username, openChatWindow]);

    useEffect(() => {
        if(socket.current) {
            console.log("i am here")
            socket.current.on('message', msg => {
                console.log(msg);
            });
        }
    });

    const toggleChatWindow = (e) => {
        e.preventDefault();
        
        setOpenChatWindow(openChatWindow => !openChatWindow);

        if(openChatWindow) {
            socket.current.disconnect();
        }
    }

    const onMessageSent = (message) => {
        console.log(message);
        console.log(socket.current)
        socket.current.emit('message', { from: socket.id, to: 'admin', message: message });

        
    }

    return (
        ReactDOM.createPortal(
            (
                <>
                    {openChatWindow ? 
                        <ChatWindow messageSent={onMessageSent} /> : null}

                    <div className={classes.UserChat}>
                        <div className={classes.UserChatIconWrapper} onClick={toggleChatWindow}>
                            <svg className={classes.UserChat__Icon}>
                                <use xlinkHref={`${svg}#icon-chat`}></use>
                            </svg>
                        </div>
                    </div>
                </>
            ), document.getElementById('chat-root')
        )
    );
}

export default UserChat;