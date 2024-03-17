import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/layouts/Home";
import Login from "./components/auth/Login";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";

function App() {
  return (
    <div>
      <Navbar/>
      <div className="flex mt-20" >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route />
      </Routes>
    </div>
    </div>
  );
}

export default App;
