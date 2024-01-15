import axios from "axios";
import {
    GET_COLLECTION_BY_USER_SUCCESS,
    GET_COLLECTION_BY_USER_REQUEST,
    GET_COLLECTION_BY_USER_FAILURE,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAILURE,
    DELETE_COLLECTION_REQUEST
} from './actionTypes';
import { BASE_URL } from '../../config/apiConfig';


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


export const deleteExhibitionCollections = () => {
    return async (dispatch) => {
        dispatch({ type: DELETE_COLLECTION_REQUEST });
        try {
            const response = await axios.delete(`${BASE_URL}/delete-collections`);
            if (response.status === 200) {
                dispatch({ type: DELETE_COLLECTION_SUCCESS, payload: response.data });
            } else {
                dispatch({ type: DELETE_COLLECTION_FAILURE, error: 'Delete failed' });
            }
        } catch (error) {
            console.log('Axios Error:', error); // Log the error for debugging
            dispatch({ type: DELETE_COLLECTION_FAILURE, error: error.message }); // Pass server error message
        }
    }
}
