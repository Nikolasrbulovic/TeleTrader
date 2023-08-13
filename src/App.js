import "./App.css";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import Home from "./pages/Home";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route
          exact
          path="/favorites"
          element={
            <AuthRedirect>
              <Favorites></Favorites>
            </AuthRedirect>
          }
        />
        <Route exact path="/:symbol" element={<Details></Details>} />
      </Routes>
    </>
  );
}

export default App;
