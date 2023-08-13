const selectTickerData = (state) => state.ticker.tickerData;
const selectTickerSymbols = (state) => state.ticker.tickerSymbols;
const selectRestTickerData = (state) => state.ticker.tickerRestData;
const selectFavorites = (state) => state.ticker.favorites;

export {
  selectTickerData,
  selectTickerSymbols,
  selectRestTickerData,
  selectFavorites,
};
