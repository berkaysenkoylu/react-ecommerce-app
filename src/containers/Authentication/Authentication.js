import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import ErrorDialogue from '../../components/ErrorDialogue/ErrorDialogue';
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showError: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.redirectPath !== this.props.redirectPath && this.props.redirectPath === '/auth/login') {
            // SIGNUP SUCCESSFULL
            this.props.history.push(this.props.redirectPath);
        }

        if(prevProps.error !== this.props.error && this.props.error !== null) {
            // Check if there is an error
            this.setState({
                showError: true
            });
        }
    }

    onSignupFormSubmitHandler = (formData) => {
        this.props.signup(formData);
    }

    onLoginFormSubmitHandler = (formData) => {
        this.props.login(formData);
    }

    onCloseErrorDialogueHandler = () => {
        this.setState({
            showError: false
        });
    }

    render() {
        let content = null;
        if(this.props.isAuthenticated){
            // LOGIN SUCCESSFULL
            content = <Redirect to='/' />;
        } else {
            content = (
                <Switch>
                    <Route path={this.props.match.url + "/login"} render={() => <Login loginFormSubmit={this.onLoginFormSubmitHandler} />} />
                    <Route path={this.props.match.url + "/signup"} render={() => <Signup signupFormSubmit={this.onSignupFormSubmitHandler} />} />
                    
                    <Redirect to={this.props.match.url + "/login"} />
                </Switch>
            );
        }

        return (
            <>
                <ErrorDialogue show={this.state.showError} errorMessage={this.props.error} closed={this.onCloseErrorDialogueHandler} />
                {content}
            </>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.isLoading,
        error: state.error,
        token: state.token,
        isAuthenticated: state.isAuth,
        redirectPath: state.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (formData) => dispatch(actions.signup(formData)),
        login: (formData) => dispatch(actions.login(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);