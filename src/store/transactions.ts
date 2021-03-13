import { createSlice } from '@reduxjs/toolkit'
import { State } from 'react-native-gesture-handler';
import { RootState } from '.';
import { getListTransactions, insertTransaction } from '../database/transaction';
import { dummyData, Transaction } from '../types/transaction';
import { endOfMonth, startOfMonth } from '../utils/date';

// Slice
const slice = createSlice({
    name: 'transactions',
    initialState: {
        data: [],
        count: 0,
        filters: {
            startDate: startOfMonth,
            endDate: endOfMonth
        }
    },
    reducers: {
        addTransactions: (state, action) => {
            state.data = action.payload;
            state.count = action.payload.length;
        },
    },
});
export default slice.reducer;

// Action
const { addTransactions } = slice.actions;
export const getTransactions = () => async (dispatch: any, getState:any) => {
    try {
        const filters = getState().transactions.filters;
        
        const transactions = await getListTransactions(filters.startDate, filters.endDate);
        const data = transactions.map(item => {
            const res: Transaction = {
                Category: {
                    Icon: item.CategoryIcon,
                    Color: item.CategoryColor,
                    Name: item.CategoryName,
                    Group: item.CategoryGroup,
                    Type: item.CategoryType
                },
                Date: new Date(new Date(item.Date).toDateString()),
                Amount: item.Amount,
                Note: item.Note
            };
            return res;
        })
        dispatch(addTransactions(data));
    } catch (e) {
        return console.error(e.message);
    }
}