import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/layouts/Home";
import Login from "./components/auth/Login";

function App() {
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route />
      </Routes>
    </div>
  );
}

export default App;
