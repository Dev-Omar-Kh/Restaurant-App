import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMainData = createAsyncThunk('main/getMainData' , async() => {

    const {data} = await axios.get('https://restaurant-six-snowy.vercel.app/main');
    return data;

});

const mainSlice = createSlice({

    name : 'main',

    initialState : {

        mainData : null,
        mainLoading : true,
        mainError : false

    },

    extraReducers : (builder) => {

        builder.addCase(getMainData.fulfilled , (state , action) => {
            state.mainData = action.payload.result;
            state.mainLoading = false;
            state.mainError = false;
        });

        builder.addCase(getMainData.pending , (state) => {
            state.mainLoading = true;
        });

        builder.addCase(getMainData.rejected , (state) => {
            state.mainError = true;
        });

    }

});

export const mainReduce = mainSlice.reducer;