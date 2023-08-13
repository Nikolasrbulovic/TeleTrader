import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/slice";
import tickerReducer from "./ticker/slice";
export default configureStore({
  reducer: {
    login: loginReducer,
    ticker: tickerReducer,
  },
});
