import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import authReducer from "./reducer/auth";
import formReducer from "./reducer/form";
import facultyReducer from "./reducer/facultyReducer"
import financeReducer from "./reducer/financeReducers"
import deanReducers from "./reducer/deanReducers";
import generalReducers from "./reducer/combineReducers"
import { combineReducers } from "redux";

const reducers = combineReducers({ authReducer, formReducer,facultyReducer,financeReducer ,deanReducers , generalReducers });
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducers, composedEnhancer);

export default store;