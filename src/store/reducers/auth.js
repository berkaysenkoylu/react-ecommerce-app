import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    isAuth: false
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
            return updateObject(state, { isLoading: true, error: null });
        case actionTypes.SIGNUP_SUCCESS:
            return updateObject(state, { isLoading: false, error: null, token: null, isAuth: false });
        case actionTypes.SIGNUP_FAIL:
            return updateObject(state, { isLoading: false, error: action.error });
        case actionTypes.SIGNUP_REDIRECTED:
            return updateObject(state, { isLoading: false, error: null, token: null, isAuth: false });
        default:
            break;
    }

    return state;
}

export default reducer;