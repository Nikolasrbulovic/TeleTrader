import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../store/login/slice";
const Header = () => {
  const dispatch = useDispatch();

  return (
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" class="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorites" class="nav-link px-2">
              Favorites
            </Link>
          </li>
        </ul>

        <div class="col-md-3 text-end">
          <button
            type="button"
            class="btn btn-outline-primary me-2"
            onClick={() => dispatch(logIn())}
          >
            Login
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
