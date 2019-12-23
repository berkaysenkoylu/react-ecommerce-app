import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    feedback: { isError: false, message: null },
    token: null,
    isAuth: false,
    userId: null
};

// Utility function for state management
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const reducer = (state=initialState, action) => {

    switch(action.type) {
        case actionTypes.SIGNUP_START:
            return updateObject(state, { isLoading: true, feedback: { isError: false, message: null } });
        case actionTypes.SIGNUP_SUCCESS:
            return updateObject(state, { isLoading: false, feedback: { isError: false, message: action.success } });
        case actionTypes.SIGNUP_FAIL:
            return updateObject(state, { isLoading: false, feedback: { isError: true, message: action.error } });
        case actionTypes.SIGNUP_REDIRECT:
            return updateObject(state, { isLoading: false, feedback: { isError: false, message: null } });
        case actionTypes.LOGIN_START:
            return updateObject(state, { isLoading: true, feedback: { isError: false, message: null }, token: null, isAuth: false, userId: null });
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, { isLoading: false, feedback: { isError: false, message: null }, token: action.token, isAuth: true, userId: action.userId });
        case actionTypes.LOGIN_FAIL:
            return updateObject(state, { isLoading: false, feedback: { isError: true, message: action.error }, token: null, isAuth: false, userId: false });
        case actionTypes.LOGOUT:
            return updateObject(state, { isLoading: false, feedback: { isError: false, message: null }, token: null, isAuth: false, userId: null });
        default:
            break;
    }

    return state;
}

export default reducer;