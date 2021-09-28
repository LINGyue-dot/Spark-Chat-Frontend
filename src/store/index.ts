import { configureStore } from "@reduxjs/toolkit";
import wsSlice from "./ws/wsSlice";

export const store = configureStore({
  reducer: {
    websocket: wsSlice
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch