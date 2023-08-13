import { createSlice } from "@reduxjs/toolkit";

export const tickerSlice = createSlice({
  name: "ticker",
  initialState: {
    tickerData: [],
    tickerSymbols: [],
    tickerRestData: {},
    favorites: [],
  },
  reducers: {
    clearTickerData: (state, action) => {
      state.tickerData = [];
    },
    setTickerData: (state, action) => {
      const tickerDataIndex = state.tickerData.findIndex((ticker) => {
        return ticker.chanId === action.payload.chanId;
      });

      if (tickerDataIndex !== -1) {
        state.tickerData = state.tickerData.map((ticker) => {
          if (ticker.chanId === action.payload.chanId) {
            return { ...ticker, ...action.payload };
          }
          return ticker;
        });
      } else {
        state.tickerData = [...state.tickerData, action.payload];
      }
    },
    setSymbols: (state, action) => {
      state.tickerSymbols = action.payload;
    },
    setRestTickerData: (state, action) => {
      state.tickerRestData = action.payload;
    },
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});
export const {
  setTickerData,
  setSymbols,
  setRestTickerData,
  addFavorite,
  clearTickerData,
  setFavorites,
} = tickerSlice.actions;

export default tickerSlice.reducer;
