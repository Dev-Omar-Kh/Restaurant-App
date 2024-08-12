import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getInfoData =  createAsyncThunk('info/getInfoData' , async() => {

    const {data} = await axios.get('https://restaurant-six-snowy.vercel.app/infoRestaurant');
    return data;

})

const infoSlice = createSlice({

    name : 'info',

    initialState : {

        dataInfo : null,
        isLoading : true,

    },

    extraReducers : (builder) => {

        builder.addCase(getInfoData.fulfilled , (state , action) => {
            state.isLoading = false;
            state.isError = false;
            state.dataInfo = action.payload.result;
        });

        builder.addCase(getInfoData.pending , (state) => {
            state.isLoading = true;
        });

    }

});

export const infoReduce = infoSlice.reducer;