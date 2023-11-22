// brandActions.js
import axios from 'axios';
import {
    CREATE_COLLECTION_FAILURE,
    CREATE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAILURE,
    DELETE_COLLECTION_SUCCESS,
    GET_COLLECTIONS_FAILURE,
    GET_COLLECTIONS_SUCCESS,
    GET_COLLECTION_FAILURE,
    GET_COLLECTION_SUCCESS,
    UPDATE_COLLECTION_FAILURE,
    UPDATE_COLLECTION_SUCCESS,
    
} from "./actionTypes";
import { BASE_URL } from '../../config/config';
import { Alert } from 'react-native';



// Action Creators
export const createCollection = (collectionName) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/create-collection`, collectionName);
        dispatch({ type: CREATE_COLLECTION_SUCCESS, payload: response.data });
        Alert.alert(response.data.message)
        console.log(response.data.message)
    } catch (error) {
        console.error('Axios Error:', error);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
        Alert.alert(error.message)
        dispatch({ type: CREATE_COLLECTION_FAILURE, payload: error.message });
    }
};

export const getCollections = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/exhibition-collections`);
        dispatch({ type: GET_COLLECTIONS_SUCCESS, payload: response.data });
        // console.log(response.data , "action console get request")
    } catch (error) {
        console.error(error);
        dispatch({ type: GET_COLLECTIONS_FAILURE, payload: error.message });
    }
};


// export const getCollection = (id) => {
//     return async (dispatch) => {
//         dispatch({ type: GET_COLLECTION_SUCCESS });
//         try {
//             const response = await axios.get(`${BASE_URL}/exhibition-collection/${id}`);
//             console.log('Axios Response:', response); // Log the response for debugging
//             if (response.status === 200) {
//                 dispatch({ type: GET_COLLECTION_SUCCESS, payload: response.data });
//                 return response.data; // Return the data
//             } else {
//                 dispatch({ type: GET_COLLECTION_FAILURE, error: response.data.message });
//             }
//         } catch (error) {
//             console.log('Axios Error:', error); // Log the error for debugging
//             dispatch({ type: GET_COLLECTION_FAILURE, error: 'Error fetching meetings data' });
//         }
//     };
// };


export const getCollection = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/exhibition-collection/${id}`);
        dispatch({ type: GET_COLLECTION_SUCCESS, payload: response.data });
        console.log('Axios Response:', response.data)
    } catch (error) {
        console.error(error, "action error");
        dispatch({ type: GET_COLLECTION_FAILURE, payload: error.message });
    }
};





// export const updateBrand = (brandId, updatedBrandData) => async (dispatch) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/update_brand/${brandId}`, updatedBrandData);
//         dispatch({ type: UPDATE_BRAND_SUCCESS, payload: response.data });
//     } catch (error) {
//         console.error(error);
//         dispatch({ type: UPDATE_BRAND_FAILURE, payload: error.message });
//     }
// };

// export const deleteBrand = (brandId) => async (dispatch) => {
//     try {
//         await axios.delete(`${BASE_URL}/delete_brand/${brandId}`);
//         dispatch({ type: DELETE_BRAND_SUCCESS, payload: brandId });
//     } catch (error) {
//         console.error(error);
//         dispatch({ type: DELETE_BRAND_FAILURE, payload: error.message });
//     }
// };
