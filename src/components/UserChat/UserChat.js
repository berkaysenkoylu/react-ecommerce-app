import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import axios from 'axios';

import svg from '../../assets/images/sprite.svg';
import classes from './UserChat.module.scss';
import ChatWindow from './ChatWindow/ChatWindow';

class UserChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openChatWindow: false,
            adminOnline: false,
            messages: [],
            unreadMessageCount: 0
        }

        this.socket = io('https://sleepy-reaches-13632.herokuapp.com/', {
            query: `username=${props.username}&userId=${props.userId}`
        });
    }

    componentDidMount() {

        axios.get('https://sleepy-reaches-13632.herokuapp.com/api/chat').then(response => {
            if(response.data.users.find(user => user.userId === 'admin')) {
                this.setState({
                    adminOnline: true
                });
            }
        });

        if(this.socket) {
            this.socket.on('message', data => {
                this.setState(prevState => {
                    let newMessage = { from: data.from, message: data.message };

                    return {
                        messages: prevState.messages.concat(newMessage),
                        unreadMessageCount: !prevState.openChatWindow ? prevState.unreadMessageCount + 1 : prevState.unreadMessageCount
                    }
                });
            });

            this.socket.on('admin joined', () => {
                // console.log('admin joined')
                this.setState({
                    adminOnline: true
                });
            });

            this.socket.on('admin left', () => {
                // console.log('admin left')
                this.setState({
                    adminOnline: false
                });
            });
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    toggleChatWindow = (e) => {
        e.preventDefault();
    
        this.setState(prevState => {
            return {
                openChatWindow: !prevState.openChatWindow,
                unreadMessageCount: 0
            }
        });
    }

    onMessageSent = (message) => {
        this.socket.emit('message', { from: this.socket.id, to: 'admin', message: message });

        this.setState(prevState => {
            let newMessage = { from: this.socket.id, message: message };

            return {
                messages: prevState.messages.concat(newMessage)
            }
        });
    }

    render() {
        return (
            ReactDOM.createPortal(
                (
                    <>
                        {this.state.openChatWindow ? 
                            <ChatWindow
                                username={this.props.username}
                                messageSent={this.onMessageSent}
                                adminOnline={this.state.adminOnline}
                                messages={this.state.messages} /> : null}
    
                        <div className={classes.UserChat}>
                            {this.state.unreadMessageCount > 0 ? <span className={classes.UnreadMessageCount}>
                                {this.state.unreadMessageCount}
                            </span> : null}
                            <div className={classes.UserChatIconWrapper} onClick={this.toggleChatWindow}>
                                <svg className={classes.UserChat__Icon}>
                                    <use xlinkHref={`${svg}#icon-chat`}></use>
                                </svg>
                            </div>
                        </div>
                    </>
                ), document.getElementById('chat-root')
            )
        )
    }
}

export default UserChat;

// import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
// import io from 'socket.io-client';
// import axios from 'axios';

// import svg from '../../assets/images/sprite.svg';
// import classes from './UserChat.module.scss';
// import ChatWindow from './ChatWindow/ChatWindow';

// const UserChat = (props) => {
//     const [openChatWindow, setOpenChatWindow] = useState(false);
//     const [isAdminAvailable, setIsAdminAvailable] = useState(false);
//     const [messages, setMessages] = useState([]);
//     let socket = useRef();

//     useEffect(() => {
//         if(openChatWindow) {
//             socket.current = io('http://localhost:8000/', {
//                 query: `username=${props.username}&userId=${props.userId}`
//             });
//         }
        
//     }, [props.userId, props.username, openChatWindow]);

//     useEffect(() => {
//         if(socket.current) {
//             socket.current.on('message', data => {
//                 console.log(data);
//             });

//             socket.current.on('admin joined', () => {
//                 setIsAdminAvailable(true);
//             });

//             socket.current.on('admin left', () => {
//                 setIsAdminAvailable(false);
//             });
//         }
//     });

//     const toggleChatWindow = (e) => {
//         e.preventDefault();

//         if(!openChatWindow) {
//             axios.get('http://localhost:8000/api/chat').then(response => {
//                 if(response.data.users.find(user => user.userId === 'admin')) {
//                     setIsAdminAvailable(true);
//                 }
//             });
//         }
        
        
//         setOpenChatWindow(openChatWindow => !openChatWindow);

//         if(openChatWindow) {
//             socket.current.disconnect();
//         }
//     }

//     const onMessageSent = (message) => {
//         socket.current.emit('message', { from: socket.current.id, to: 'admin', message: message });
//     }

//     return (
//         ReactDOM.createPortal(
//             (
//                 <>
//                     {openChatWindow ? 
//                         <ChatWindow messageSent={onMessageSent} adminOnline={isAdminAvailable} /> : null}

//                     <div className={classes.UserChat}>
//                         <div className={classes.UserChatIconWrapper} onClick={toggleChatWindow}>
//                             <svg className={classes.UserChat__Icon}>
//                                 <use xlinkHref={`${svg}#icon-chat`}></use>
//                             </svg>
//                         </div>
//                     </div>
//                 </>
//             ), document.getElementById('chat-root')
//         )
//     );
// }

// export default UserChat;