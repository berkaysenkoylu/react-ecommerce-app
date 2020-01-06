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
            focusedUser: null
        };

        this.socket = openSocket('http://localhost:8000', {
            query: 'username=admin&userId=admin'
        });
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/chat').then(response => {
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
                return {
                    usersInRoom: usersArr,
                    focusedUser: usersArr.find(user => user.userSocket === prevState.focusedUser) ? prevState.focusedUser : null
                }
            });
        });

        this.socket.on('message', (msg) => {
            console.log(msg);
        })
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    onSendMessage = (msg) => {
        // socket.current.emit('message', { from: 'admin', message: msg });
        this.socket.emit('message', { from: 'admin', to: this.state.focusedUser,  message: msg });
    }

    onUserFocused = (socketId) => {
        this.setState({
            focusedUser: socketId
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
                        />
                    </div>

                    <div className={classes.Chat__Messages}>
                        <div className={classes.Chat__Messages__Wrapper}>
                            {this.state.focusedUser ? <ChatWindow username={this.state.usersInRoom.find(user => user.userSocket === this.state.focusedUser).username} /> : null}
                        </div>
                        <ChatInput messageSent={this.onSendMessage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;