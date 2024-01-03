import {
    CREATE_MEETING_SUCCESS,
    CREATE_MEETING_FAILURE,
    GET_MEETINGS_SUCCESS,
    GET_MEETINGS_FAILURE,
    GET_MEETING_SUCCESS,
    GET_MEETING_FAILURE
} from "./actionTypes";

import { BASE_URL } from '../../config/apiConfig';
import { Alert } from 'react-native';
import axios from "axios";



// Action Creators
export const createMeeting = (meeting) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/create-meeting`, meeting);
        dispatch({ type: CREATE_MEETING_SUCCESS, payload: response.data });
        Alert.alert(response.data.message)
        console.log(response.data.message)
    } catch (error) {
        console.error('Axios Error:', error);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
        Alert.alert(error.message)
        dispatch({ type: CREATE_MEETING_FAILURE, payload: error.message });
    }
};

export const getMeetings = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/meetings`);
        dispatch({ type: GET_MEETINGS_SUCCESS, payload: response.data });
        // console.log(response.data , "action console")
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_MEETINGS_FAILURE, payload: error.message });
    }
};

export const getMeeting = (meetingId) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/meeting/${meetingId}`);
        console.log(response , "response.....")
        dispatch({ type: GET_MEETING_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_MEETING_FAILURE, payload: error.message });
    }
};