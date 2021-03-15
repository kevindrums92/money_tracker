import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import { getListTransactions } from '../database/transaction';
import { Transaction } from '../types/transaction';
import { endOfMonth, startOfMonth } from '../utils/date';
import { getTransactionListExpenses, getTransactionListIncome } from '../utils/transactionUtils';

type FilterPeriod = "Monthly" | "Weekly" | "Yearly";
export interface TransactionFiltersSlice {
    startDate: Date;
    endDate: Date;
    filterPeriod: FilterPeriod;
}
export interface TransactionSlice {
    data: Transaction[],
    count: number,
    filters: TransactionFiltersSlice,
    income: number,
    expenses: number,
    balance: number,
}

const initialState: TransactionSlice = {
    data: [],
    count: 0,
    filters: {
        startDate: startOfMonth(),
        endDate: endOfMonth(),
        filterPeriod: "Monthly"
    },
    income: 0,
    expenses: 0,
    balance: 0
}

// Slice
const slice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.data = action.payload;
            state.count = action.payload.length;
        },
        setFilters: (state, action: PayloadAction<TransactionFiltersSlice>) => ({
            ...state,
            filters: action.payload
        }),
        setOverviewBalance: (state, action) => ({
            ...state,
            balance: action.payload.balance,
            income: action.payload.income,
            expenses: action.payload.expenses
        })
    },
});
export default slice.reducer;

// Action
const { setTransactions, setFilters, setOverviewBalance } = slice.actions;
export const getTransactions = () => async (dispatch: any, getState: any) => {
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
        });
        const income = getTransactionListIncome(data);
        const expenses = getTransactionListExpenses(data);
        const balance = income - expenses;

        dispatch(setTransactions(data));
        dispatch(setOverviewBalance({
            income, expenses, balance
        }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const changePeriod = (forward: boolean) => async (dispatch: any, getState: any) => {
    try {
        const { filters } = getState().transactions as TransactionSlice;

        switch (filters.filterPeriod) {
            case "Monthly":
                const acum = (forward) ? +1 : -1;
                const newStartDate = moment(filters.startDate).add(acum, 'M').toDate();
                const newFilters: TransactionFiltersSlice = {
                    ...filters,
                    startDate: newStartDate,
                    endDate: endOfMonth(newStartDate.getMonth() + 1, newStartDate.getFullYear())
                };
                dispatch(setFilters(newFilters));
                dispatch(getTransactions());
                break;
        }
    } catch (e) {
        return console.error(e.message);
    }
}