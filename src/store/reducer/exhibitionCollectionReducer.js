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
} from "../actions/actionTypes";

// brandReducer.js
const initialState = {
    collections: [],
    collection: null,
    loading: false,
    error: null,
};

const exhibitionCollectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COLLECTION_SUCCESS:
            // console.log(action.payload , "reducer console")
            return {
                ...state,
                collections: [...state.collections, action.payload],
                loading: false,
            };
        case CREATE_COLLECTION_FAILURE:
            // console.log(action.payload , "failuer console in reducer")
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_COLLECTIONS_SUCCESS:
            console.log(action.payload, "reducer console")
            return {
                ...state,
                collections: action.payload,
                loading: false,
            };
        case GET_COLLECTIONS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_COLLECTION_SUCCESS:
            console.log(action.payload, "reducer console.....")
            return {
                ...state,
                collection: action.payload,
                loading: false,
            };
        case GET_COLLECTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case UPDATE_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: action.payload,
                loading: false,
            };
        case UPDATE_COLLECTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case DELETE_COLLECTION_SUCCESS:
            return {
                ...state,
                collections: state.collections.filter(collection => collection._id !== action.payload),
                loading: false,
            };
        case DELETE_COLLECTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        
        default:
            return state;
    }
};

export default exhibitionCollectionReducer;
