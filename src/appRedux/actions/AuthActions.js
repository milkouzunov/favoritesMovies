import { 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actionTypes';

export const signupRequest = ({ username, password, rePassword }) => ({
    type: SIGNUP_REQUEST,
    userData: {username, password, rePassword}
});

export const signupSuccess = (userData) => ({
    type: SIGNUP_SUCCESS,
    userData
});

export const signinRequest = ({ username, password }) => ({
    type: SIGNIN_REQUEST,
    userData: {username, password}
});

export const signinSuccess = (userData) => ({
    type: SIGNIN_SUCCESS,
    userData
});

export const signinErrorSuccess = (error) => ({
    type: SIGNIN_ERROR_SUCCESS,
    error
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})