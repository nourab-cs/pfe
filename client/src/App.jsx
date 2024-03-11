import { useEffect, useState } from "react";
import One from "./components/One";
import Two from "./components/Two";
import Profile from "./components/Profile";
import Auth from "./HOC/Auth";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [state, setState] = useState(true);

  return (
    <div>
      <Link to="/profile"> Profile link</Link>
      <Link to="/one">One</Link>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/one/*" element={<One />} />

        <Route />
      </Routes>
    </div>
  );
}

export default App;
