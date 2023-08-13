import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectTickerData } from "../store/ticker/selector";

import parseDataToDisplay from "../shared/utils/parseDataToDisplay";
import { setFavorites } from "../store/ticker/slice";
import { useEffect } from "react";

const Favorites = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectTickerData);
  const favorites = useSelector(selectFavorites);

  const tableFirstRow = [
    "Name",
    "Last Price",
    "Daily Change",
    "Daily Change Percent",
    "Daily High",
    "Daily Low",
  ];

  const loadFavoritesData = () => {
    return data.filter((el) => favorites.includes(el.pair));
  };

  const deleteFromFavorites = (pair) => {
    const newFavorites = favorites.filter((el) => el != pair);
    dispatch(setFavorites(newFavorites));
  };

  let favoritesData = loadFavoritesData();

  useEffect(() => {
    const lsFavorites = localStorage.getItem("favorites");
    if (lsFavorites) {
      dispatch(setFavorites(JSON.parse(lsFavorites)));
    }
  }, []);

  useEffect(() => {
    favoritesData = loadFavoritesData();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <table className="table shadow w-75 ">
          <thead>
            <tr>
              {tableFirstRow.map((column, index) => {
                return (
                  <th key={index} scope="col">
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {favoritesData?.map((channel) => {
              return (
                <tr>
                  <th scope="row">{channel.pair}</th>
                  {parseDataToDisplay(channel.data).map((data, index) => {
                    return <td key={index}>{data}</td>;
                  })}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        deleteFromFavorites(channel.pair);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center "></div>
    </>
  );
};

export default Favorites;
