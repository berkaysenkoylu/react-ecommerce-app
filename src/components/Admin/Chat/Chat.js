import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

import classes from './Chat.module.scss';
import ChatInput from './ChatInput/ChatInput';
import UserList from './UserList/UserList';
import ChatWindow from './ChatWindow/ChatWindow';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersInRoom: [],
            focusedUser: null,
            messages: {}, // "<UserSocket>": [ { from: 'admin', message: 'yaba daba duu' }, { from: 'user', message: 'Hallllo, MOFO' }, ...etc ], ...
            unseenMessageCount: {} // "<UserSocket>": 23, "<UserSocket>": 11, etc...
        };

        this.socket = openSocket('https://sleepy-reaches-13632.herokuapp.com/', {
            query: 'username=admin&userId=admin'
        });
    }

    componentDidMount() {
        axios.get('https://sleepy-reaches-13632.herokuapp.com/api/chat').then(response => {
            this.setState({
                usersInRoom: response.data.users
            });
        });

        this.socket.on('user joined', usersArr => {
            this.setState({
                usersInRoom: usersArr
            });
        });

        this.socket.on('user disconnect', usersArr => {
            this.setState(prevState => {
                const socketOfLeavingUser = this.getSocketOfLeavingUser(usersArr, prevState.usersInRoom);

                // If a user leaves and we have his/her messages in the state, delete it.
                if(socketOfLeavingUser in prevState.messages) {
                    let copiedMessages = {...prevState.messages};
                    delete copiedMessages[socketOfLeavingUser];

                    // Also delete unseen messages
                    if(socketOfLeavingUser in prevState.unseenMessageCount) {
                        let copiedUnseen = {...prevState.unseenMessageCount};
                        delete copiedUnseen[socketOfLeavingUser];

                        return {
                            usersInRoom: usersArr,
                            focusedUser: usersArr.find(user => user.userSocket === prevState.focusedUser) ? prevState.focusedUser : null,
                            messages: copiedMessages,
                            unseenMessageCount: copiedUnseen
                        }
                    }
                    else {
                        return {
                            usersInRoom: usersArr,
                            focusedUser: usersArr.find(user => user.userSocket === prevState.focusedUser) ? prevState.focusedUser : null,
                            messages: copiedMessages
                        }
                    }
                }
                else {
                    return {
                        usersInRoom: usersArr,
                        focusedUser: usersArr.find(user => user.userSocket === prevState.focusedUser) ? prevState.focusedUser : null,
                    }
                }
            });
        });

        this.socket.on('message', (data) => {
            this.setState( prevState => this.addMessage(prevState, { from: data.from, message: data.message }));
            
            this.setState(prevState => {
                if(prevState.focusedUser !== data.from) {
                    let copiedUnseenMessageCount = {...prevState.unseenMessageCount};

                    if(data.from in prevState.unseenMessageCount) {
                        copiedUnseenMessageCount[data.from] += 1;
                    }
                    else {
                        copiedUnseenMessageCount[data.from] = 1;
                    }

                    return {
                        ...prevState,
                        unseenMessageCount: copiedUnseenMessageCount
                    }
                }
            })
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    onSendMessage = (msg) => {
        // socket.current.emit('message', { from: 'admin', message: msg });
        if(!this.state.focusedUser) {
            return;
        }
        this.socket.emit('message', { from: 'admin', to: this.state.focusedUser,  message: msg });

        this.setState( prevState => this.addMessage(prevState, { from: 'admin', message: msg }));
    }

    addMessage = (prevState, newMessage) => {
        let copiedMessages = {...prevState.messages};

        if(newMessage.from === 'admin') {
            if(prevState.focusedUser in prevState.messages) {
                let copiedUserMessages = [...copiedMessages[prevState.focusedUser]];
    
                copiedUserMessages = copiedUserMessages.concat(newMessage);
    
                copiedMessages[prevState.focusedUser] = copiedUserMessages;
    
                return {
                    ...prevState,
                    messages: copiedMessages
                }
            }
            else {
                copiedMessages[prevState.focusedUser] = [newMessage];
    
                return {
                    ...prevState,
                    messages: copiedMessages
                }
            }
        }
        else {
            if(newMessage.from in prevState.messages) {
                let copiedUserMessages = [...copiedMessages[newMessage.from]];
    
                copiedUserMessages = copiedUserMessages.concat(newMessage);
    
                copiedMessages[newMessage.from] = copiedUserMessages;
    
                return {
                    ...prevState,
                    messages: copiedMessages
                }
            }
            else {
                copiedMessages[newMessage.from] = [newMessage];
    
                return {
                    ...prevState,
                    messages: copiedMessages
                }
            }
        }
        
    }

    getSocketOfLeavingUser = (currUsers, oldUsers) => {
        let socket = null;
        oldUsers.forEach(oldUser => {
            if(!currUsers.find(currUser => currUser.userSocket === oldUser.userSocket)) {
                socket = oldUser.userSocket;
            }
        });

        return socket;
    }

    onUserFocused = (socketId) => {
        this.setState(prevState => {
            if(socketId in prevState.unseenMessageCount) {
                let copiedUnseen = {...prevState.unseenMessageCount};
                copiedUnseen[socketId] = 0;
                return {
                    focusedUser: socketId,
                    unseenMessageCount: copiedUnseen
                }
            }
            else {
                return {
                    focusedUser: socketId
                }
            }
        });
    }

    render() {
        return (
            <div className={classes.Chat}>
                <header className={classes.Chat__Header}>
                    <h2>Messages</h2>
                </header>

                <div className={classes.Chat__Window}>
                    <div className={classes.Chat__Users}>
                        <UserList 
                            onlineUsers={this.state.usersInRoom}
                            userFocused={this.onUserFocused}
                            focusedUser={this.state.focusedUser}
                            unseenMessages={this.state.unseenMessageCount}
                        />
                    </div>

                    <div className={classes.Chat__Messages}>
                        <div className={classes.Chat__Messages__Wrapper}>
                            {this.state.focusedUser ? 
                                <ChatWindow
                                    userSocket={this.state.focusedUser}
                                    username={this.state.usersInRoom.find(user => user.userSocket === this.state.focusedUser).username}
                                    messages={this.state.messages} /> : null}
                        </div>
                        <ChatInput messageSent={this.onSendMessage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;