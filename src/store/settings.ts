import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initDB } from '../database/connector';
import { getBudgetsDB, getSettingsDB, insertBudgetDB, insertSettingsDB } from '../database/settings';
import { Budget, Settings } from '../types/Settings';

export interface SettingsSlice {
    settings?: Settings;
    step: number;
    loading: boolean;
    budgetInserted: number;
}

const initialState: SettingsSlice = {
    settings: undefined,
    step: 1,
    loading: true,
    budgetInserted: 0
}

// Slice
const slice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setStep: (state, action) => ({
            ...state, step: action.payload
        }),
        setLoadingComplete: (state) => ({
            ...state, loading: false
        }),
        setBudgetInserted: (state, action: PayloadAction<number>) => ({
            ...state, budgetInserted: action.payload
        }),
        setSettings: (state, action: PayloadAction<Settings>) => ({
            ...state, settings: action.payload
        })
    },
});
export default slice.reducer;

// Action
const { setStep, setLoadingComplete, setBudgetInserted, setSettings } = slice.actions;

export const getSettings = () => async (dispatch: any, getState: any) => {
    try {
        const resinitDB = await initDB();
        if (resinitDB) {
            const resSettings = await getSettingsDB();
            if (resSettings) {
                const settings: Settings = {
                    Id: resSettings.Id,
                    DailyNotifications: resSettings.DailyNotifications === 1 ? true: false,
                    ScheduledTransactionsNotifications: resSettings.ScheduledTransactionsNotifications === 1 ? true: false,
                    Currency: resSettings.Currency,
                    SelectedBudget: resSettings.SelectedBudget,
                    WelcomeComplete: true,
                    BudgetObj: {
                        Name: resSettings.Name,
                        Icon: resSettings.Icon,
                        Periodicity: resSettings.Periodicity,
                        Startday: resSettings.Startday
                    }
                }
                dispatch(setSettings(settings));
                console.log(settings);
                
            } else {
                const budgets = await getBudgetsDB();
                if (budgets && budgets.length > 0) {
                    dispatch(setBudgetInserted(budgets[0].Id));
                    dispatch(setStep(2));
                }
            }
        }
        setTimeout(() => { dispatch(setLoadingComplete()); }, 500);
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
        const { budgetInserted } = getState().settings;
        const itemToInsert: Settings = {
            ...item,
            SelectedBudget: budgetInserted,
            WelcomeComplete: true,
        };
        const settings = await insertSettingsDB(itemToInsert);
        dispatch(getSettings());

    } catch (e) {
        return console.error(e);
    }
}

