import axios from 'axios';
import { BASE_URL } from '../../../App';
import { FETCH_SHEET_DATA_FAILURE, FETCH_SHEET_DATA_SUCCESS } from './actionTypes';


export const getSheetData = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/sheet-data`);
        dispatch({ type: FETCH_SHEET_DATA_SUCCESS, payload: response.data });
        console.log(response.data , "action console")
    } catch (error) {
        console.error(error);
        dispatch({ type: FETCH_SHEET_DATA_FAILURE, payload: error.message });
    }
};