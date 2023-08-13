import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { tickerService } from "../service/TickerService";
import { useDispatch } from "react-redux";
import { addFavorite, setRestTickerData } from "../store/ticker/slice";
import { useSelector } from "react-redux";
import {
  selectFavorites,
  selectRestTickerData,
} from "../store/ticker/selector";

const Details = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const restData = useSelector(selectRestTickerData);
  const { symbol } = useParams();

  const addToFavoritesHandler = (symbol) => {
    dispatch(addFavorite(symbol));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await tickerService.getRestPublicTicker({
          symbol: symbol,
        });

        dispatch(setRestTickerData(data.data));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <table className="table shadow w-75">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last Price</th>
              <th scope="col">High</th>
              <th scope="col">Low</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{symbol}</th>
              <td>{restData.last_price}</td>
              <td>{restData.high}</td>
              <td>{restData.low}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center ">
        <button
          className="btn btn-primary"
          onClick={() => {
            addToFavoritesHandler(symbol);
          }}
        >
          Add to Favorites
        </button>
      </div>
    </>
  );
};

export default Details;
