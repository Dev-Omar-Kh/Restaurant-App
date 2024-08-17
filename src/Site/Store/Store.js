import { configureStore } from "@reduxjs/toolkit";
import { infoReduce } from "./InfoSlice";
import { mainReduce } from "./MainSlice";
import { adminRouteReduce } from "./AdminRouteSlice";

export const Store = configureStore({

    reducer : {

        info : infoReduce,
        main : mainReduce,
        adminRoute : adminRouteReduce,

    }

});