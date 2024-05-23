import {
    CREATE_CONCERNPERSON_FAILURE,
    CREATE_CONCERNPERSON_SUCCESS,
    DELETE_CONCERNPERSON_FAILURE,
    DELETE_CONCERNPERSON_SUCCESS,
    GET_BRAND_FAILURE,
    GET_CONCERNPERSONS_FAILURE,
    GET_CONCERNPERSONS_SUCCESS,
    GET_CONCERNPERSON_FAILURE,
    GET_CONCERNPERSON_SUCCESS,
    UPDATE_CONCERNPERSON_FAILURE,
    UPDATE_CONCERNPERSON_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    concernPersons: [],
    concernPerson: null,
    loading: false,
    error: null,
};

const concernPersonReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONCERNPERSON_SUCCESS:
            console.log(action.payload , "action console")
            return {
                ...state,
                concernPersons: [...state.concernPersons, action.payload],
                loading: false,
            };
        case CREATE_CONCERNPERSON_FAILURE:
            console.log(action.payload , "failuer console in reducer")
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_CONCERNPERSONS_SUCCESS:
            console.log(action.payload , "reducer console......")
            return {
                ...state,
                concernPersons: action.payload,
                loading: false,
            };
        case GET_CONCERNPERSONS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_CONCERNPERSON_SUCCESS:
            return {
                ...state,
                concernPerson: action.payload,
                loading: false,
            };
        case GET_CONCERNPERSON_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case UPDATE_CONCERNPERSON_SUCCESS:
            return {
                ...state,
                concernPerson: action.payload,
                loading: false,
            };
        case UPDATE_CONCERNPERSON_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case DELETE_CONCERNPERSON_SUCCESS:
            return {
                ...state,
                concernPersons: state.concernPersons.filter(concernPerson => concernPerson._id !== action.payload),
                loading: false,
            };
        case DELETE_CONCERNPERSON_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default concernPersonReducer;
