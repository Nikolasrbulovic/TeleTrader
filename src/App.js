import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/favorites" element={<Favorites></Favorites>} />
        <Route path="/details" element={<Details></Details>} />
      </Routes>
    </>
  );
}

export default App;
