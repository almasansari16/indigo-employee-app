// brandActions.js
import axios from 'axios';
import {
    CREATE_BRAND_FAILURE,
    CREATE_BRAND_SUCCESS,
    DELETE_BRAND_FAILURE,
    DELETE_BRAND_SUCCESS,
    GET_BRANDS_FAILURE,
    GET_BRANDS_SUCCESS,
    GET_BRAND_FAILURE,
    GET_BRAND_SUCCESS,
    UPDATE_BRAND_FAILURE,
    UPDATE_BRAND_SUCCESS
} from "./actionTypes";
import { BASE_URL } from '../../config/apiConfig';
import { Alert } from 'react-native';



// Action Creators
export const createBrand = (brand) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/create-brand`, brand);
        dispatch({ type: CREATE_BRAND_SUCCESS, payload: response.data });
        Alert.alert(response.data.message)
        console.log(response.data.message)
    } catch (error) {
        console.error('Axios Error:', error);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
        Alert.alert(error.message)
        dispatch({ type: CREATE_BRAND_FAILURE, payload: error.message });
    }
};

export const getBrands = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-brands`);
        dispatch({ type: GET_BRANDS_SUCCESS, payload: response.data });
        console.log(response.data , "action console")
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_BRANDS_FAILURE, payload: error.message });
    }
};

export const getBrand = (brandId) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/get_brand/${brandId}`);
        dispatch({ type: GET_BRAND_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_BRAND_FAILURE, payload: error.message });
    }
};

export const updateBrand = (brandId, updatedBrandData) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/update_brand/${brandId}`, updatedBrandData);
        dispatch({ type: UPDATE_BRAND_SUCCESS, payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: UPDATE_BRAND_FAILURE, payload: error.message });
    }
};

export const deleteBrand = (brandId) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/delete_brand/${brandId}`);
        dispatch({ type: DELETE_BRAND_SUCCESS, payload: brandId });
    } catch (error) {
        console.error(error);
        dispatch({ type: DELETE_BRAND_FAILURE, payload: error.message });
    }
};
