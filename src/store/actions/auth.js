import * as actionTypes from './actionTypes';
import axiosAuth from '../../axios-auth';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    }
}

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
}

export const redirectedAfterSignup = () => {
    return {
        type: actionTypes.SIGNUP_REDIRECTED
    }
}

export const signup = (userData) => {
    return dispatch => {
        dispatch(signupStart());

        axiosAuth.post('/signup', userData).then(response => {
            dispatch(signupSuccess());
            dispatch(redirectedAfterSignup());
        }).catch(error => {
            dispatch(signupFail(error.response.data.message));
        });
    }
}