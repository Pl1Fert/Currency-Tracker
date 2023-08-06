import { createSlice } from "@reduxjs/toolkit";

interface ITheme {
    darkTheme: boolean;
}

const initialState: ITheme = {
    darkTheme: true,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => ({ darkTheme: !state.darkTheme }),
    },
});

export const { actions: themeActions, reducer: themeReducer } = themeSlice;
