import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../store/login/slice";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/login/selectors";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const login = () => {
    dispatch(logIn());
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      dispatch(logIn());
    }
  }, []);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/favorites" className="nav-link px-2">
                Favorites
              </Link>
            </li>
          )}
        </ul>

        <div className="col-md-3 text-end">
          {!isLoggedIn && (
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => login()}
            >
              Login
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
