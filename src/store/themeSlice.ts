import { createSlice } from "@reduxjs/toolkit";

interface Theme {
    darkTheme: boolean;
}

const initialState: Theme = {
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
