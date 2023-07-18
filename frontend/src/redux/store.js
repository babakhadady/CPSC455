import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsReducer.js";

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store;
