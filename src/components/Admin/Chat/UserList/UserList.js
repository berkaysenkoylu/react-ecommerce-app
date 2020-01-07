import React from 'react';

import classes from './UserList.module.scss';
import User from './User/User';

const UserList = (props) => {

    return (
        <div className={classes.UserList}>
            <h2>
                Online Users
            </h2>
            
            {props.onlineUsers.map(user => {
                if(user.userId !== 'admin') {
                    return <User 
                        key={user.userId}
                        username={user.username}
                        unseen={(props.unseenMessages !== {} && user.userSocket in props.unseenMessages) ? props.unseenMessages[user.userSocket] : 0}
                        clicked={() => props.userFocused(user.userSocket)} isFocused={props.focusedUser === user.userSocket} />
                }
                else {
                    return null;
                }
            })}
        </div>
    )
}

export default UserList;