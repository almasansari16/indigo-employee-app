import axios from "axios";
import { BASE_URL } from "../../config/config";
import {
    GET_SELECT_EXHIBITION_GARMENT_FAILURE,
    GET_SELECT_EXHIBITION_GARMENT_SUCCESS,
    SELECT_EXHIBITION_GARMENT_FAILURE,
    SELECT_EXHIBITION_GARMENT_SUCCESS
} from "./actionTypes";



export const selectGarmentForExibition = (selectedGarment) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/saved-garment`, selectedGarment);
        dispatch({ type: SELECT_EXHIBITION_GARMENT_SUCCESS, payload: response.data });
        Alert.alert(response.data.message)
        console.log(response.data)
    } catch (error) {
        console.error('Axios Error:', error);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
        Alert.alert(error.message)
        dispatch({ type: SELECT_EXHIBITION_GARMENT_FAILURE, payload: error.message });
    }
};


export const getSelectedGarment = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-brands`);
        dispatch({ type: GET_SELECT_EXHIBITION_GARMENT_SUCCESS, payload: response.data });
        // console.log(response.data , "action console")
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_SELECT_EXHIBITION_GARMENT_FAILURE, payload: error.message });
    }
};