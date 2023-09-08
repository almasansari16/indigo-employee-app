// actions/authActions.js
import axios from 'axios';
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    API_BASE_URL,
  } from './constant';
  
export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

export const signup = (userData) => {
  return async (dispatch) => {
    dispatch(signupRequest());

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);
      
      // Check for validation errors returned by the backend
      if (response.data.errors) {
        dispatch(signupFailure(response.data.errors));
        console.log(response.data.errors , "resnopse error")
      } else {
        dispatch(signupSuccess(response.data));
        console.log(response.data, "sucesss")
      }
    } catch (error) {
      dispatch(signupFailure(error.message));
      console.log(error.message, "failuredjbhj")
    }
  };
}
