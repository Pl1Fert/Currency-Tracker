import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CurrencyService } from "@/services";

interface ICurrencyRate {
    symbol: string;
    value: number;
}

interface ICurrencyRates {
    last_updated_at: string;
    rates: ICurrencyRate[];
}

const initialState: ICurrencyRates = {
    last_updated_at: "",
    rates: [],
};

export const getAllRates = createAsyncThunk<ICurrencyRates>("currency/getAllRates", async () => {
    try {
        const data = await CurrencyService.getCurrencyRates();
        const arrayRates: ICurrencyRate[] = [];
        if (data) {
            const ratesValues: number[] = data.map((item) => item.data.BRL.value);
            const symbols: string[] = CurrencyService.getCurrencySymbols();
            for (let i = 0; i < symbols.length; i += 1) {
                arrayRates.push({
                    symbol: symbols.at(i) as string,
                    value: ratesValues[i] as number,
                });
            }

            return {
                last_updated_at: data[0]?.meta.last_updated_at as string,
                rates: arrayRates,
            };
        }
        return {
            last_updated_at: "",
            rates: [],
        };
    } catch (e) {
        return {
            last_updated_at: "",
            rates: [],
        };
    }
});

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllRates.fulfilled, (_, action) => ({
            // eslint-disable-next-line no-param-reassign
            ...action.payload,
        }));
    },
});

export const { actions: currencyActions, reducer: currencyReducer } = currencySlice;
