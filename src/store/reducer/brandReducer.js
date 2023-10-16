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
} from "../actions/actionTypes";

// brandReducer.js
const initialState = {
    brands: [],
    brand: null,
    loading: false,
    error: null,
};

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BRAND_SUCCESS:
            // console.log(action.payload , "action console")
            return {
                ...state,
                brands: [...state.brands, action.payload],
                loading: false,
            };
        case CREATE_BRAND_FAILURE:
            // console.log(action.payload , "failuer console in reducer")
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_BRANDS_SUCCESS:
            // console.log(action.payload , "reducer console")
            return {
                ...state,
                brands: action.payload,
                loading: false,
            };
        case GET_BRANDS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_BRAND_SUCCESS:
            return {
                ...state,
                brand: action.payload,
                loading: false,
            };
        case GET_BRAND_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case UPDATE_BRAND_SUCCESS:
            return {
                ...state,
                brand: action.payload,
                loading: false,
            };
        case UPDATE_BRAND_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                brands: state.brands.filter(brand => brand._id !== action.payload),
                loading: false,
            };
        case DELETE_BRAND_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default brandReducer;
