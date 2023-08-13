import { tickerService } from "../service/TickerService";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import WebSocket from "websocket";
import { useDispatch } from "react-redux";
import parseDataToDisplay from "../shared/utils/parseDataToDisplay";
import { setTickerData } from "../store/ticker/slice";
import { useSelector } from "react-redux";
import { memo } from "react";

import { selectTickerData } from "../store/ticker/selector";
import mapSymbolsToRequest from "../shared/utils/symbol-mapper";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectTickerData);

  const tableFirstRow = [
    "Name",
    "Last Price",
    "Daily Change",
    "Daily Change Percent",
    "Daily High",
    "Daily Low",
  ];

  useEffect(() => {
    let w = new WebSocket.w3cwebsocket("wss://api-pub.bitfinex.com/ws/2");

    w.onopen = async () => {
      if (!data.length) {
        const symbols = await tickerService.getListOfSymbols();
        const requestData = mapSymbolsToRequest(symbols);
        requestData?.forEach((symbol) => {
          w.send(symbol);
        });
      }

      w.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data?.event === "subscribed") {
          dispatch(
            setTickerData({
              chanId: data.chanId,
              pair: data.pair,
              symbol: data.symbol,
              data: [],
            })
          );
        } else {
          if (data[1] === "hb") {
            return;
          }
          if (Array.isArray(data[1])) {
            const channelWithData = {
              chanId: data[0],
              data: data[1],
            };
            dispatch(setTickerData(channelWithData));
          }
        }
      };
    };
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <table className="table shadow w-75 ">
        <thead>
          <tr>
            {tableFirstRow?.map((column, index) => {
              return (
                <th key={index} scope="col">
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((channel, index) => {
            return (
              <tr key={index}>
                <th key={index} scope="row">
                  <Link to={`${channel.pair}`}>{channel.pair}</Link>
                </th>
                {parseDataToDisplay(channel.data).map((data, index) => {
                  return <td key={index}>{data}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Home);
