import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initDB } from '../database/connector';
import { getBudgetsDB, getSettingsDB, insertBudgetDB, insertSettingsDB, updateBudgetDB, updateSettingsDB } from '../database/settings';
import { Budget, Settings } from '../types/Settings';
import { setInitialFilters } from './transactions';

export interface SettingsSlice {
    settings?: Settings;
    step: number;
    loading: boolean;
    budgetInserted: number;
    notifyUpdate:boolean;
}

const initialState: SettingsSlice = {
    settings: undefined,
    step: 1,
    loading: true,
    budgetInserted: 0,
    notifyUpdate:false,
}

// Slice
const slice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setStep: (state, action) => ({
            ...state, step: action.payload
        }),
        setLoading: (state, action) => ({
            ...state, loading: action.payload
        }),
        setBudgetInserted: (state, action: PayloadAction<number>) => ({
            ...state, budgetInserted: action.payload
        }),
        setSettings: (state, action: PayloadAction<Settings>) => ({
            ...state, settings: action.payload
        }),
        setNotifyUpdate: (state, action: PayloadAction<boolean>) => ({
            ...state, notifyUpdate: action.payload
        }),
    },
});
export default slice.reducer;

// Action
const { setStep, setLoading, setBudgetInserted, setSettings, setNotifyUpdate } = slice.actions;

export const getSettings = () => async (dispatch: any, getState: any) => {
    try {
        const { loading } = getState().settings;
        if (!loading) return;
        const resinitDB = await initDB();
        if (resinitDB) {
            const resSettings = await getSettingsDB();
            if (resSettings) {
                const settings: Settings = {
                    Id: resSettings.Id,
                    DailyNotifications: resSettings.DailyNotifications === 1 ? true : false,
                    ScheduledTransactionsNotifications: resSettings.ScheduledTransactionsNotifications === 1 ? true : false,
                    Currency: resSettings.Currency,
                    SelectedBudget: resSettings.SelectedBudget,
                    WelcomeComplete: true,
                    BudgetObj: {
                        Name: resSettings.Name,
                        Icon: resSettings.Icon,
                        Periodicity: resSettings.Periodicity,
                        Startday: resSettings.Startday,
                        Id: resSettings.SelectedBudget
                    }
                }
                //hago el set settings y mando a hacer la primera carga
                //seteo antes los filters del date selector
                dispatch(setInitialFilters(settings));
                dispatch(setSettings(settings));
            } else {
                const budgets = await getBudgetsDB();
                if (budgets && budgets.length > 0) {
                    dispatch(setBudgetInserted(budgets[0].Id));
                    dispatch(setStep(2));
                }
            }
        }
        setTimeout(() => { dispatch(setLoading(false)); }, 500);
    } catch (error) {
        console.log(error);
        return console.error(error);
    }
}

export const submitStep1 = (item: Budget) => async (dispatch: any, getState: any) => {
    try {
        const budgetId = await insertBudgetDB(item);
        dispatch(setBudgetInserted(budgetId));
        dispatch(setStep(2));
    } catch (e) {
        return console.error(e);
    }
}

export const submitStep2 = (item: Settings) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setLoading(true));
        const { budgetInserted } = getState().settings;
        const itemToInsert: Settings = {
            ...item,
            SelectedBudget: budgetInserted,
            WelcomeComplete: true,
        };
        await insertSettingsDB(itemToInsert);
        dispatch(getSettings());

    } catch (e) {
        return console.error(e);
    }
}

export const updateSettings = (data: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setLoading(true));
        const { settings } = getState().settings as SettingsSlice;
        if(!settings || !settings.BudgetObj){
            return;
        }
        
        //update budget
        const budgetToupdate: Budget = {
            ...settings.BudgetObj,
            Name: data.Name,
            Periodicity: data.Periodicity,
            Startday: data.Startday
        }
        await updateBudgetDB(budgetToupdate);
        //update settings
        
        await updateSettingsDB(data.DailyNotifications, data.ScheduledTransactionsNotifications, settings.Id || 0);

        //refresh data
        dispatch(getSettings());
        dispatch(setNotifyUpdate(true));
        setTimeout(() => { dispatch(setNotifyUpdate(false)); }, 500);

    } catch (e) {
        console.log(e);
        
        return console.error(e);
    }
}

