import {
    CREATE_SCAN_CODE_SUCCESS,
    CREATE_SCAN_CODE_FAILURE,
    GET_SCAN_CODES_SUCCESS,
    GET_SCAN_CODES_FAILURE,
    GET_SCAN_CODE_SUCCESS,
    GET_SCAN_CODE_FAILURE,
    GET_SCAN_CODE_REQUEST
} from "./actionTypes";

import { BASE_URL } from '../../config/config';
import { Alert } from 'react-native';
import axios from "axios";



// Action Creators
export const createScanCode = (scanCode) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/scan-code`, scanCode);
        dispatch({ type: CREATE_SCAN_CODE_SUCCESS, payload: response.data });
        Alert.alert(response.data.message)
        console.log(response.data.message)
    } catch (error) {
        console.error('Axios Error:', error);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
        Alert.alert(error.message)
        dispatch({ type: CREATE_SCAN_CODE_FAILURE, payload: error.message });
    }
};

// export const getMeetings = () => async (dispatch) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/get-brands`);
//         dispatch({ type: GET_BRANDS_SUCCESS, payload: response.data });
//         // console.log(response.data , "action console")
//     } catch (error) {
//         console.error(error);
//         dispatch({ type: GET_BRANDS_FAILURE, payload: error.message });
//     }
// };

// export const getMeeting = (meetingId) => async (dispatch) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/meeting/${meetingId}`);
//         dispatch({ type: GET_MEETING_SUCCESS, payload: response.data });
//     } catch (error) {
//         console.error(error);
//         dispatch({ type: GET_MEETING_FAILURE, payload: error.message });
//     }
// };

export const fetchScanCodeByUserId = (userId) => {
    return async (dispatch) => {
        dispatch({ type: GET_SCAN_CODE_REQUEST });
        try {
            const response = await axios.get(`${BASE_URL}/get-scan-by-user/${userId}`);
            // console.log('Axios Response:', response); // Log the response for debugging
            if (response.status === 200) {
                dispatch({ type: GET_SCAN_CODE_SUCCESS, payload: response.data });
            } else {
                dispatch({ type: GET_SCAN_CODE_FAILURE, error: 'Failed to fetch meetings data' });
            }
        } catch (error) {
            console.log('Axios Error:', error); // Log the error for debugging
            dispatch({ type: GET_SCAN_CODE_FAILURE, error: 'Error fetching meetings data' });
        }
    };
};