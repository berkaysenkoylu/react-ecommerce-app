import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import ErrorDialogue from '../../components/ErrorDialogue/ErrorDialogue';
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';
import RequestResetPassword from '../../components/Auth/RequestResetPassword/RequestResetPassword';
import ResetPassword from '../../components/Auth/ResetPassword/ResetPassword';

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

    onEmailFormSubmitted = (email) => {
        this.props.requestPasswordReset(email);
    }

    onPasswordResetFormSubmitHandler = (formData, token) => {
        this.props.resetPassword(formData, token);
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
                    <Route exact path={this.props.match.url + "/reset-password"} render={() => 
                        <RequestResetPassword 
                            emailFormSubmit={this.onEmailFormSubmitted} 
                            loading={this.props.loading}
                            reqSuccessfull={!this.state.showError} />} />
                    <Route path={this.props.match.url + "/reset-password/:token"} render={() => 
                        <ResetPassword 
                            {...this.props} 
                            resetFormSubmit={this.onPasswordResetFormSubmitHandler} 
                            loading={this.props.loading}
                            reqSuccessfull={!this.state.showError}
                            path={this.props.redirectPath} /> } />
                    
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
        login: (formData) => dispatch(actions.login(formData)),
        requestPasswordReset: (email) => dispatch(actions.passwordResetRequest(email)),
        resetPassword: (formData, token) => dispatch(actions.resetPassword(formData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);