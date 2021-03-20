import {
    configureStore,
} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from "redux-thunk";
import transactions from './transactions';
import settings from './settings';


const reducer = combineReducers({
    transactions,
    settings
});

const store = configureStore({
    reducer,
    middleware: [thunk]
});


export default store;
export type RootState = ReturnType<typeof store.getState>;