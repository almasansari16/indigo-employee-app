// garmentReducer.js
import {
    SELECT_EXHIBITION_GARMENT_SUCCESS,
    SELECT_EXHIBITION_GARMENT_FAILURE,
    GET_SELECT_EXHIBITION_GARMENT_SUCCESS,
    GET_SELECT_EXHIBITION_GARMENT_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    selectedGarment: null,
    errorSelect: null,
    selectedExhibitionGarments: [],
    errorGet: null,
};

const selectGarmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_EXHIBITION_GARMENT_SUCCESS:
            return {
                ...state,
                selectedExhibitionGarments: [...state.selectedExhibitionGarments, action.payload], // Add the selected garment to the array
                errorSelect: null,
            };

        case SELECT_EXHIBITION_GARMENT_FAILURE:
            return {
                ...state,
                errorSelect: action.payload,
            };

        case GET_SELECT_EXHIBITION_GARMENT_SUCCESS:
            return {
                ...state,
                selectedExhibitionGarments: action.payload,
                errorGet: null,
            };

        case GET_SELECT_EXHIBITION_GARMENT_FAILURE:
            return {
                ...state,
                errorGet: action.payload,
            };

        default:
            return state;
    }
};

export default selectGarmentReducer;
