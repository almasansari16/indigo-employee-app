// authActions.js
import axios from 'axios';
import { BASE_URL } from '../../config/apiConfig';
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from './actionTypes';
import { Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigateToDashboard } from '../../utils/navigationUtils';

const login = (email, password) => async (dispatch) => {

    try {
        // Dispatch action to set loading state
        dispatch({ type: LOGIN_REQUEST });

        // Make an API request to authenticate the user
        const response = await axios.post(`${BASE_URL}/login`, { email, password });

        // Dispatch action to set user data and authentication status
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        console.log(response.data.msg, "user data");


        // Save token in local storage for future requests
        const token = response.data.accessToken;
        await AsyncStorage.setItem('accessToken', token);
        
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('token', JSON.stringify(response.data.user.refreshToken));
        // Alert.alert(response.data.msg)
        // navigateToDashboard(navigation)
        
    } catch (error) {
        // Alert.alert(error.response.data.message)
        console.log(error.response.data.message, "error.........in action")
        // Dispatch action to handle login failure
        dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
    }
};

const signup = (name, email, password, contact, role) => async (dispatch) => {
    try {
        // Dispatch action to set loading state
        dispatch({ type: SIGNUP_REQUEST });

        // Make an API request to authenticate the user
        const response = await axios.post(`${BASE_URL}/signup`, { name, email, password, contact , role });
        console.log(response.data, "response")
        Alert.alert(response.data.msg)
        // Dispatch action to set user data and authentication status
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
        // Dispatch action to handle login failure
        console.log(error, "error")
        dispatch({ type: SIGNUP_FAILURE, payload: error.response.data.message });
    }
};


 const getAllUsers = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/all-users`);
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
        console.log(response.data , "action console")
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_ALL_USERS_FAILURE, payload: error.message });
    }
};


export { login, signup , getAllUsers };
