// authReducer.js

import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    LOGOUT,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE
} from '../actions/actionTypes';

const initialState = {
    users: [],
    user: null,           // User data when logged in
    isAuthenticated: false,
    loading: false,       // Loading state while making API requests
    error: null,          // Error message in case of failures
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SIGNUP_SUCCESS:
            console.log(action.payload, "payload data ")
            return {
                ...state,
                // users:[...user , action.payload],
                user: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            };

        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload, // Store user data upon successful login
                isAuthenticated: true,
                loading: false,
                error: null,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Store error message in case of login failure
            };

        case LOGOUT:
            return {
                ...state,
                user: null,           // Clear user data on logout
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case GET_ALL_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
