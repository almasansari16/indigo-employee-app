// meetingActions.js

import axios from 'axios';
import {
    FETCH_MEETINGS_FAILURE,
    FETCH_MEETINGS_REQUEST,
    FETCH_MEETINGS_SUCCESS
} from './actionTypes';
import { BASE_URL } from '../../config/config';


export const fetchMeetingsByUserId = (userId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_MEETINGS_REQUEST });
        try {
            const response = await axios.get(`${BASE_URL}/meetings/user/${userId}`);
            console.log('Axios Response:', response); // Log the response for debugging
            if (response.status === 200) {
                dispatch({ type: FETCH_MEETINGS_SUCCESS, payload: response.data });
            } else {
                dispatch({ type: FETCH_MEETINGS_FAILURE, error: 'Failed to fetch meetings data' });
            }
        } catch (error) {
            console.log('Axios Error:', error); // Log the error for debugging
            dispatch({ type: FETCH_MEETINGS_FAILURE, error: 'Error fetching meetings data' });
        }
    };
};

