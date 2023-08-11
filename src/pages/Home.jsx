import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/login/selectors";
const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);
  return <div>asdasd {isLoggedIn}</div>;
};

export default Home;
