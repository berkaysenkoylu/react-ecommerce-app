import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    isAuth: false,
    userId: null,
    redirectPath: null,
    userStatus: null
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
            return updateObject(state, { isLoading: true, error: null, redirectPath: null });
        case actionTypes.SIGNUP_SUCCESS:
            return updateObject(state, { isLoading: false, error: null, redirectPath: action.path });
        case actionTypes.SIGNUP_FAIL:
            return updateObject(state, { isLoading: false, error: action.error, redirectPath: null });
        case actionTypes.SIGNUP_REDIRECT:
            return updateObject(state, { isLoading: false, error: null });
        case actionTypes.LOGIN_START:
            return updateObject(state, { isLoading: true, error: null, token: null, isAuth: false, userId: null, redirectPath: null, userStatus: null });
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, { isLoading: false, error: null, token: action.token, isAuth: true, userId: action.userId, redirectPath: action.path, userStatus: action.status });
        case actionTypes.LOGIN_FAIL:
            return updateObject(state, { isLoading: false, error:  action.error, token: null, isAuth: false, userId: false, redirectPath: null, userStatus: null });
        case actionTypes.LOGOUT:
            return updateObject(state, { isLoading: false, error: null, token: null, isAuth: false, userId: null, redirectPath: null, userStatus: null });
        case actionTypes.PASSWORD_RESET_REQUEST_START:
            return updateObject(state, { isLoading: true, error: null, token: null, isAuth: false, userId: null, redirectPath: null });
        case actionTypes.PASSWORD_RESET_REQUEST_SUCCESS:
            return updateObject(state, { isLoading: false, error: null, token: null, isAuth: false, userId: null, redirectPath: action.path });
        case actionTypes.PASSWORD_RESET_REQUEST_FAIL:
            return updateObject(state, { isLoading: false, error: action.error, token: null, isAuth: false, userId: null, redirectPath: action.path });
        case actionTypes.PASSWORD_RESET_START:
            return updateObject(state, { isLoading: true, error: null, token: null, isAuth: false, userId: null, redirectPath: null });
        case actionTypes.PASSWORD_RESET_SUCCESS:
            return updateObject(state, { isLoading: false, error: null, token: null, isAuth: false, userId: null, redirectPath: action.path });
        case actionTypes.PASSWORD_RESET_FAIL:
            return updateObject(state, { isLoading: false, error: action.error, token: null, isAuth: false, userId: null, redirectPath: action.path });
        default:
            break;
    }

    return state;
}

export default reducer;