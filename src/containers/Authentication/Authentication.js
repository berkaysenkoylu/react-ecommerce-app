import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

class Authentication extends Component {
    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + "/login"} component={Login} />
                <Route path={this.props.match.url + "/signup"} component={Signup} />
                <Route exact path={this.props.match.url} render={() => {
                    return (
                        <div>
                            Authentication Container
                        </div>
                    )
                }} />
            </Switch>
        );
    };
};

export default Authentication;