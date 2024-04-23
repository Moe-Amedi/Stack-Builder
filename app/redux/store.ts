import { configureStore } from "@reduxjs/toolkit";
import stackReducer from "./stack/stackSlice";
import dataReducer from "./dataStack/dataSlice";

export const store = configureStore({
  reducer: {
    stack: stackReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
