import {
    configureStore,
} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from "redux-thunk";
import transactions from './transactions';


const reducer = combineReducers({
    transactions
});

const store = configureStore({
    reducer,
    middleware: [thunk]
});


export default store;
export type RootState = ReturnType<typeof store.getState>;