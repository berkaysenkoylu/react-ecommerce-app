import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.timer = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.feedback.message) {
            this.timer = setTimeout(() => {
                this.props.redirected();
                this.props.history.push('/auth/login');
            }, 3000);
        }
    }

    componentWillUnmount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    onSignupFormSubmitHandler = (formData) => {
        this.props.signup(formData);
    }

    onLoginFormSubmitHandler = (formData) => {
        this.props.login(formData);
    }

    render() {
        let content = null;
        if(this.props.isAuthenticated){
            content = <Redirect to='/' />
        } else {
            content = (
                <Switch>
                    <Route path={this.props.match.url + "/login"} render={() => <Login loginFormSubmit={this.onLoginFormSubmitHandler} />} />
                    <Route path={this.props.match.url + "/signup"} render={() => <Signup signupFormSubmit={this.onSignupFormSubmitHandler} message={this.props.feedback.message} />} />
                    
                    <Redirect to={this.props.match.url + "/login"} />
                </Switch>
            )
        }

        return (
            content
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.isLoading,
        feedback: state.feedback,
        token: state.token,
        isAuthenticated: state.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (formData) => dispatch(actions.signup(formData)),
        redirected: () => dispatch(actions.signupRedirect()),
        login: (formData) => dispatch(actions.login(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);