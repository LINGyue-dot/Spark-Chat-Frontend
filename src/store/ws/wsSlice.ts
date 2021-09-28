import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import WS from "../../utils/websocket";

interface WSState {
  websocket: WS | undefined
}

const initialState: WSState = {
  websocket: undefined
}

export const wsSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    initWebsocket: (state, action: PayloadAction<WS | undefined>) => {
      state.websocket = action.payload
    }
  },
})
export const { initWebsocket } = wsSlice.actions

export const selectWebsocket = (state: RootState) => state.websocket.websocket

export default wsSlice.reducer

