import { API } from "../shared/api";

export const tickerService = {
  getRestPublicTicker: async ({ symbol }) => {
    const data = await API.get(`/pubticker/${symbol}`);
    return data;
  },

  getListOfSymbols: async () => {
    try {
      const data = await API.get("/symbols");
      return data.data.slice(0, 5);
    } catch (error) {
      console.error(error);
    }
  },
};
