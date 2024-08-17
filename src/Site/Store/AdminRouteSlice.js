import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const adminRouteSlice =  createSlice({

    name : 'adminRoute',

    initialState : {

        userRole : null

    },

    reducers : {

        getUserRole : (state) => {

            if(localStorage.getItem('tkn')){

                const {role} = jwtDecode(localStorage.getItem('tkn'));

                state.userRole = role;

            }

        }

    }

});

export const {getUserRole} = adminRouteSlice.actions;
export const adminRouteReduce = adminRouteSlice.reducer;