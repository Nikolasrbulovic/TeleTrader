const mapSymbolsToRequest = (symbols) => {
  if (!symbols) {
    return;
  }
  return symbols.map((symbol) =>
    JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: `t${symbol.toUpperCase()}`,
    })
  );
};

export default mapSymbolsToRequest;
