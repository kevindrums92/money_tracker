import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import { removeNotification, setNotification } from '../backgroundTasks/notificationHub';
import { getListTransactions, insertTransactionDB, removeTransactionDB, setScheduledFalseTransactionDB, updateTransactionDB } from '../database/transaction';
import { BudgetPeriodicity, Settings } from '../types/Settings';
import { Transaction } from '../types/transaction';
import { endOfMonth, getCurrentMonth, getCurrentYear, startOfMonth } from '../utils/date';
import { getNewDateTransactionRecurrency, getTransactionListExpenses, getTransactionListIncome, parseTransactionData } from '../utils/transactionUtils';

export interface TransactionFiltersSlice {
    startDate: Date;
    endDate: Date;
    filterPeriod: BudgetPeriodicity;
    startDay: number;
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
        filterPeriod: "monthly",
        startDay: 1
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
        setItemInsertedOrDeleted: (state, action) => ({
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
const { setTransactions, setFilters, setOverviewBalance, setItemInsertedOrDeleted, setErrorMessage, setItemUpdated, setLoading } = slice.actions;
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

export const setInitialFilters = (settings: Settings) => async (dispatch: any, getState: any) => {
    const newFilters: TransactionFiltersSlice = {
        filterPeriod: settings.BudgetObj?.Periodicity || "monthly",
        startDate: new Date(),
        endDate: new Date(),
        startDay: settings.BudgetObj?.Startday || 1
    }
    const { Startday } = settings.BudgetObj || { Startday: 1 };
    switch (settings.BudgetObj?.Periodicity) {
        case "monthly":
            newFilters.startDate = moment([getCurrentYear, getCurrentMonth - 1, Startday]).toDate();
            if (Startday === 1) {
                newFilters.endDate = endOfMonth();
            } else {
                //le resto un minuto para que por ejemplo; si la fecha inicio es 5 de marzo a las 00, la fecha fin sea 4 marzo a las 23h:59m
                newFilters.endDate = moment(newFilters.startDate).add(1, 'month').add(-1, 'minute').toDate();
            }
            break;
        case "weekly":
            newFilters.startDate = moment().startOf('week').add(Startday === 7 ? 0 : Startday, 'days').toDate();
            newFilters.endDate = moment(newFilters.startDate).add(1, 'week').add(-1, 'minute').toDate();

            break;
        case "yearly":
            newFilters.startDate = moment([getCurrentYear, 0, Startday]).toDate();
            newFilters.endDate = moment(newFilters.startDate).add(1, 'year').add(-1, 'minute').toDate();
            break;
        default:
            break;
    }
    dispatch(setFilters(newFilters));
    dispatch(getTransactions());



}

export const changePeriod = (forward: boolean) => async (dispatch: any, getState: any) => {
    try {
        const { filters } = getState().transactions as TransactionSlice;

        const newFilters: TransactionFiltersSlice = {
            ...filters
        };
        const acum = (forward) ? +1 : -1;

        switch (filters.filterPeriod) {
            case "monthly":
                newFilters.startDate = moment(filters.startDate).add(acum, 'M').toDate();
                if (filters.startDay === 1) {
                    newFilters.endDate = endOfMonth(newFilters.startDate.getMonth() + 1, newFilters.startDate.getFullYear())
                } else {
                    newFilters.endDate = moment(newFilters.startDate).add(1, 'month').add(-1, 'minute').toDate();
                }
                break;
            case "weekly":
                newFilters.startDate = moment(filters.startDate).add(acum, 'week').toDate();
                newFilters.endDate = moment(newFilters.startDate).add(1, 'week').add(-1, 'minute').toDate();
                break;
            case "yearly":
                newFilters.startDate = moment(filters.startDate).add(acum, 'year').toDate();
                newFilters.endDate = moment(newFilters.startDate).add(1, 'year').add(-1, 'minute').toDate();
                break;
        }

        dispatch(setFilters(newFilters));
        dispatch(getTransactions());
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
                    setNotification({ ...newItemtoInsert, Id: res });
                    dispatch(setItemInsertedOrDeleted(true));
                    setTimeout(function () {
                        dispatch(setItemInsertedOrDeleted(false));
                    }, 100);
                }
            } else {
                dispatch(setItemInsertedOrDeleted(true));
                setTimeout(function () {
                    dispatch(setItemInsertedOrDeleted(false));
                }, 100);
            }
            dispatch(setLoading(false));
        }
    } catch (e) {
        if (e.message) {
            dispatch(setErrorMessage(e.message));
            setTimeout(function () {
                dispatch(setErrorMessage(""));
            }, 100);
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
                setNotification({ ...newItemtoInsert, Id: resRecurrency });
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
            }, 100);
        }
        dispatch(setLoading(false));

        return console.error(e);
    }
}

export const removeTransaction = (item: Transaction) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setLoading(true));
        const res = await removeTransactionDB(item);

        if (res && item.Id && item.ShouldNotify && item.Scheduled) {
            await removeNotification(item.Date.getTime());
        }
        dispatch(setLoading(false));
        dispatch(setItemInsertedOrDeleted(true));
        setTimeout(function () {
            dispatch(setItemInsertedOrDeleted(false));
        }, 100);
    } catch (e) {
        if (e.message) {
            dispatch(setErrorMessage(e.message));
            setTimeout(function () {
                dispatch(setErrorMessage(""));
            }, 100);
        }
        dispatch(setLoading(false));

        return console.error(e);
    }
}

export const updateTransaction = (item: Transaction) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setLoading(true));
        const res = await updateTransactionDB(item);

        if (res) {
            dispatch(setItemInsertedOrDeleted(true));
            setTimeout(function () {
                dispatch(setItemInsertedOrDeleted(false));
            }, 100);
            dispatch(setLoading(false));
        }
    } catch (e) {
        if (e.message) {
            dispatch(setErrorMessage(e.message));
            setTimeout(function () {
                dispatch(setErrorMessage(""));
            }, 100);
        }
        dispatch(setLoading(false));
        return console.error(e);
    }
}