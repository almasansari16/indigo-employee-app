// reducers/authReducer.js
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from '../actions/authActions';
  
  const initialState = {
    isLoading: false,
    userData: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return { ...state, isLoading: true, error: null };
      case SIGNUP_SUCCESS:
        console.log(action.payload , "payload")
        return { ...state, isLoading: false, userData: action.payload, error: null };
      case SIGNUP_FAILURE:
        console.log(err)
        return { ...state, isLoading: false, userData: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  