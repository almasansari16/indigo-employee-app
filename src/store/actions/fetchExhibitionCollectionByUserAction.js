import axios from "axios";
import {
    GET_COLLECTION_BY_USER_SUCCESS,
    GET_COLLECTION_BY_USER_REQUEST,
    GET_COLLECTION_BY_USER_FAILURE
} from './actionTypes';
import { BASE_URL } from "../../config/config";


export const fetchExhibitionCollectionByUserId = (userId) => {
    return async (dispatch) => {
        dispatch({ type: GET_COLLECTION_BY_USER_REQUEST });
        try {
            const response = await axios.get(`${BASE_URL}/exhibition-collection-by-user/${userId}`);
            console.log('Axios Response:', response.data); // Log the response for debugging
            if (response.status === 200) {
                dispatch({ type: GET_COLLECTION_BY_USER_SUCCESS, payload: response.data });
            } else {
                dispatch({ type: GET_COLLECTION_BY_USER_FAILURE, error: 'Failed to fetch meetings data' });
            }
        } catch (error) {
            console.log('Axios Error:', error); // Log the error for debugging
            dispatch({ type: GET_COLLECTION_BY_USER_FAILURE, error: 'Error fetching meetings data' });
        }
    };
};