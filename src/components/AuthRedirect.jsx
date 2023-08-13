import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/login/selectors";

const AuthRedirect = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/"}></Navigate>;
  }

  return <>{children}</>;
};
export default AuthRedirect;
