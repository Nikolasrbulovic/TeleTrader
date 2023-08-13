import axios from "axios";

export const API = axios.create({
  baseURL: "https://try.readme.io/https://api.bitfinex.com/v1",
});
