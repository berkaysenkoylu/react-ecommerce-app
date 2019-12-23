import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

class Authentication extends Component {
    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + "/login"} component={Login} />
                <Route path={this.props.match.url + "/signup"} component={Signup} />
                {/* <Route exact path={this.props.match.url} render={() => {
                    return (
                        <div>
                            Authentication Container
                        </div>
                    )
                }} /> */}
                <Redirect to={this.props.match.url + "/login"} />
            </Switch>
        );
    };
};

export default Authentication;