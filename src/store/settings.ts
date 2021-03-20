import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsSlice {
    budget?: any;
    settings?: any;
    step: number;
    welcomeComplete: boolean;
}

const initialState: SettingsSlice = {
    budget: undefined,
    settings: undefined,
    step: 1,
    welcomeComplete: false,
}

// Slice
const slice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        // setTransactions: (state, action) => {
        //     state.data = action.payload;
        //     state.count = action.payload.length;
        // },
        setStep: (state, action) => ({
            ...state, step: action.payload
        }),
        setWelcomeComplete: (state) => ({
            ...state, welcomeComplete: true
        }),


    },
});
export default slice.reducer;

// Action
const { setStep, setWelcomeComplete } = slice.actions;

export const submitStep1 = (item: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setStep(2));
    } catch (e) {

        return console.error(e);
    }
}

export const submitStep2 = (item: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch(setWelcomeComplete());
    } catch (e) {

        return console.error(e);
    }
}