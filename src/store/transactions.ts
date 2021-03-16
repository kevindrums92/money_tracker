import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import { setNotification } from '../backgroundTasks/notificationHub';
import { getListTransactions, insertTransactionDB, setScheduledFalseTransactionDB } from '../database/transaction';
import { Transaction } from '../types/transaction';
import { endOfMonth, startOfMonth } from '../utils/date';
import { getNewDateTransactionRecurrency, getTransactionListExpenses, getTransactionListIncome, parseTransactionData } from '../utils/transactionUtils';

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
    itemInserted: boolean,
    errorMessage: string,
    itemUpdated: boolean,
    loading: boolean
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
    balance: 0,
    itemInserted: false,
    errorMessage: "",
    itemUpdated: false,
    loading: false
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
        }),
        setItemInserted: (state, action) => ({
            ...state,
            itemInserted: action.payload
        }),
        setItemUpdated: (state, action) => ({
            ...state,
            itemUpdated: action.payload
        }),
        setErrorMessage: (state, action) => ({
            ...state,
            errorMessage: action.payload
        }),
        setLoading: (state, action) => ({
            ...state,
            loading: action.payload
        }),
    },
});
export default slice.reducer;

// Action
const { setTransactions, setFilters, setOverviewBalance, setItemInserted, setErrorMessage, setItemUpdated, setLoading } = slice.actions;
export const getTransactions = () => async (dispatch: any, getState: any) => {
    try {
        const filters = getState().transactions.filters;

        const transactions = await getListTransactions(filters.startDate, filters.endDate);

        const data = parseTransactionData(transactions);
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

export const insertTransaction = (item: Transaction) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setLoading(true));
        const res = await insertTransactionDB(item);

        if (res) {
            if (item.Recurrency !== "none") {
                const newItemtoInsert = { ...item };
                const transactionDate = moment(newItemtoInsert.Date);
                newItemtoInsert.Scheduled = true;
                newItemtoInsert.Date = getNewDateTransactionRecurrency(newItemtoInsert.Recurrency, transactionDate);
                const resRecurrency = await insertTransactionDB(newItemtoInsert);
                if (resRecurrency) {
                    //Agendar notificación 
                    setNotification({...newItemtoInsert, Id:res});
                    dispatch(setItemInserted(true));
                    setTimeout(function () {
                        dispatch(setItemInserted(false));
                    }, 1000);
                }
            } else {
                dispatch(setItemInserted(true));
                setTimeout(function () {
                    dispatch(setItemInserted(false));
                }, 1000);
            }
            dispatch(setLoading(false));
        }
    } catch (e) {
        if (e.message) {
            dispatch(setErrorMessage(e.message));
            setTimeout(function () {
                dispatch(setErrorMessage(""));
            }, 1000);
        }
        dispatch(setLoading(false));
        return console.error(e);
    }
}

export const addTransactionScheduledNow = (item: Transaction) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setLoading(true));
        const res = await setScheduledFalseTransactionDB(item);

        if (res) {
            const newItemtoInsert = { ...item, Id: undefined };
            const transactionDate = moment(newItemtoInsert.Date);
            newItemtoInsert.Scheduled = true;
            newItemtoInsert.Date = getNewDateTransactionRecurrency(newItemtoInsert.Recurrency, transactionDate);

            const resRecurrency = await insertTransactionDB(newItemtoInsert);
            if (resRecurrency) {
                //Agendar notificación 
                setNotification({...newItemtoInsert, Id:resRecurrency});
                dispatch(setItemUpdated(true));
                setTimeout(function () {
                    dispatch(setItemUpdated(false));
                }, 100);
            }
            dispatch(setLoading(false));
        }
    } catch (e) {
        if (e.message) {
            dispatch(setErrorMessage(e.message));
            setTimeout(function () {
                dispatch(setErrorMessage(""));
            }, 1000);
        }
        dispatch(setLoading(false));

        return console.error(e);
    }
}