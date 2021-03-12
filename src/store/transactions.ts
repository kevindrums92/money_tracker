import { createSlice } from '@reduxjs/toolkit'
import { dummyData, Transaction } from '../types/transaction';

// Slice
const slice = createSlice({
    name: 'transactions',
    initialState: {
        data:[]
    },
    reducers: {
        addTransactions: (state, action) => {
            state.data = action.payload;
        },
    },
});
export default slice.reducer;

// Action
const { addTransactions } = slice.actions;
export const getTransactions = () => async (dispatch: any) => {
    try {
        //const sorted = dummyData.sort((a, b) => b.Date.getTime() - a.Date.getTime());
        dispatch(addTransactions(dummyData));
    } catch (e) {
        return console.error(e.message);
    }
}