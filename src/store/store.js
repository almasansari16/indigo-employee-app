// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index'; // Create this file with your reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
