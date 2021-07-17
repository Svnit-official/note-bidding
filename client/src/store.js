import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import authReducer from "./reducer/auth";
import formReducer from "./reducer/form";
import { combineReducers } from "redux";

const reducers = combineReducers({ authReducer, formReducer });
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducers, composedEnhancer);

export default store;