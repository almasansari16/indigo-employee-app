import {
    GET_COLLECTION_BY_USER_SUCCESS,
    GET_COLLECTION_BY_USER_REQUEST,
    GET_COLLECTION_BY_USER_FAILURE,
    GET_COLLECTION_SUCCESS,
    GET_COLLECTION_FAILURE
} from "../actions/actionTypes";

const initialState = {
    collections: [],
    collection: null,
    loading: false,
    error: null,
  };

const exhibitioCollectionByUser = (state = initialState, action) => {
    switch (action.type) {
     // fetch collection by user
     case GET_COLLECTION_BY_USER_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
    case GET_COLLECTION_BY_USER_SUCCESS:
        console.log(action.payload, "reducer success")
        return {
            ...state,
            loading: false,
            collections: action.payload,
            error: null
        };
    case GET_COLLECTION_BY_USER_FAILURE:
        console.log(action.error, "reducer failure")
        return {
            ...state,
            loading: false,
            error: action.error
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
        default:
           return state;
    }
}

export default exhibitioCollectionByUser