import { configureStore } from "@reduxjs/toolkit";
import { infoReduce } from "./InfoSlice";

export const Store = configureStore({

    reducer : {

        info : infoReduce,

    }

});