// concernPerson.js
import axios from 'axios';
import {
    CREATE_CONCERNPERSON_FAILURE,
    CREATE_CONCERNPERSON_SUCCESS,
    DELETE_CONCERNPERSON_FAILURE,
    DELETE_CONCERNPERSON_SUCCESS,
    GET_CONCERNPERSONS_FAILURE,
    GET_CONCERNPERSONS_SUCCESS,
    GET_CONCERNPERSON_FAILURE,
    GET_CONCERNPERSON_SUCCESS,
    UPDATE_CONCERNPERSON_FAILURE,
    UPDATE_CONCERNPERSON_SUCCESS
} from "./actionTypes";
import { BASE_URL } from '../../config/apiConfig';
import { Alert } from 'react-native';



// Action Creators
export const createConcernPerson = (concernPerson) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/create-concernPerson`, concernPerson);
        dispatch({ type: CREATE_CONCERNPERSON_SUCCESS, payload: response.data });
        Alert.alert(response.data.message)
        console.log(response.data)
    } catch (error) {
        console.error('Axios Error:', error);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
        Alert.alert(error.message)
        dispatch({ type: CREATE_CONCERNPERSON_FAILURE, payload: error.message });
    }
};

export const getConcernPersons = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-brands`);
        dispatch({ type: GET_CONCERNPERSONS_SUCCESS, payload: response.data });
        // console.log(response.data , "action console")
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_CONCERNPERSONS_FAILURE, payload: error.message });
    }
};

export const getConcernPerson = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/concernPerson/${id}`);
        dispatch({ type: GET_CONCERNPERSON_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_CONCERNPERSON_FAILURE, payload: error.message });
    }
};

export const updateConcernPerson = (id, updatedConcernPerson) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/update-concernPerson/${id}`, updatedConcernPerson);
        dispatch({ type: UPDATE_CONCERNPERSON_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: UPDATE_CONCERNPERSON_FAILURE, payload: error.message });
    }
};

export const deleteConcernPerson = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/delete-concernPerson/${id}`);
        dispatch({ type: DELETE_CONCERNPERSON_SUCCESS, payload: id });
    } catch (error) {
        console.error(error);
        dispatch({ type: DELETE_CONCERNPERSON_FAILURE, payload: error.message });
    }
};
