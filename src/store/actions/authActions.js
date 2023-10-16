// authActions.js
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from './actionTypes';
import { Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = (email, password) => async (dispatch) => {

    try {
        // Dispatch action to set loading state
        dispatch({ type: LOGIN_REQUEST });

        // Make an API request to authenticate the user
        const response = await axios.post(`${BASE_URL}/login`, { email, password });

        // Dispatch action to set user data and authentication status
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        console.log(response.data.user, "user data")
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        Alert.alert(response.data.msg)
        
    } catch (error) {
        Alert.alert(error.response.data.message)
        console.log(error.response.data.message, "error..........")
        // Dispatch action to handle login failure
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

const signup = (name, email, password, contact) => async (dispatch) => {
    try {
        // Dispatch action to set loading state
        dispatch({ type: SIGNUP_REQUEST });

        // Make an API request to authenticate the user
        const response = await axios.post(`${BASE_URL}/signup`, { name, email, password, contact });
        console.log(response.data, "response")
        Alert.alert(response.data.msg)
        // Dispatch action to set user data and authentication status
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
        // Dispatch action to handle login failure
        console.log(error, "error")
        dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
};

export { login, signup };
