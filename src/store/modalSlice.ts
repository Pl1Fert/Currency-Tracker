import { createSlice } from "@reduxjs/toolkit";

interface IModal {
    cardIdToOpenModal: number;
}

const initialState: IModal = {
    cardIdToOpenModal: 0,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        closeModal: (state) => ({ ...state, cardIdToOpenModal: 0 }),
        openModal: (state, action: { payload: number; type: string }) => ({
            ...state,
            cardIdToOpenModal: action.payload,
        }),
    },
});

export const { actions: modalActions, reducer: modalReducer } = modalSlice;
