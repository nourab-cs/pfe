import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/layouts/Home";
import Login from "./components/auth/Login";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";

import { User } from "./components/HOC/User";
import CreateOffre from "./components/offre/CreateOffre";
import AllOffres from "./components/offre/AllOffres";
import AdminIndex from "./components/admin/AdminIndex";
import { Admin } from "./components/HOC/Admin";

function App() {
  return (
    <div>
      <Navbar />
      {/* <AllOffres/> */}
      <div className="flex mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <User>
                <Profile />
              </User>
            }
          />

          <Route
            path="/admin/*"
            element={
              <Admin>
                <AdminIndex />
              </Admin>
            }
          />

          <Route />
        </Routes>
      </div>
    </div>
  );
}

export default App;
