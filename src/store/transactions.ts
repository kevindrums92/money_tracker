import { createSlice } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler';
import { getListTransactions, insertTransaction } from '../database/transaction';
import { dummyData, Transaction } from '../types/transaction';

// Slice
const slice = createSlice({
    name: 'transactions',
    initialState: {
        data: [],
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
        const transactions = await getListTransactions();
        const data = transactions.map(item=>{
            const res:Transaction = {
                Category: {
                    Icon: item.CategoryIcon,
                    Color: item.CategoryColor,
                    Name: item.CategoryName,
                    Group: item.CategoryGroup,
                    Type: item.CategoryType
                },
                Date: new Date(new Date(item.Date).toDateString()),
                Amount: item.Amount
            };
            return res;
        })
        dispatch(addTransactions(data));
    } catch (e) {
        return console.error(e.message);
    }
}