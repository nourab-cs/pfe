import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/layouts/Home";
import Login from "./components/auth/Login";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import { Public } from "./components/HOC/Public";

import { User } from "./components/HOC/User";
import CreateOffre from "./components/offre/CreateOffre";
import AllOffres from "./components/offre/AllOffres";
import AdminIndex from "./components/admin/AdminIndex";
import { Admin } from "./components/HOC/Admin";

import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ApplicationForm from "./components/ApplicationForm";
import ApplicantInformation from "./components/ApplicantInformation";
import Postuler from "./components/Postuler";
import OffreDescription from "./components/offre/OffreDescription";
import Auth from "./components/auth/Auth";
import Footer from "./components/layouts/Footer";
import Quiz from "./components/Quiz/Quiz";
import AllCandidatures from "./components/admin/AllCandidatures";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/auth"
            element={
              <Public>
                <Auth />
              </Public>
            }
          />

          <Route
            path="/register"
            element={
              <Public>
                <Register />
              </Public>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset_password/:id/:token"
            element={<ResetPassword />}
          ></Route>

          <Route
            path="/profile"
            element={
              <User>
                <Profile />
              </User>
            }
          />

          <Route
            path="/alloffres"
            element={
              <User>
                <AllOffres />
              </User>
            }
          />

          <Route
            path="/create-offre"
            element={
              <Admin>
                <CreateOffre />
              </Admin>
            }
          />
          <Route path="/description/:id" element={<OffreDescription />} />

          <Route path="/postuler/:id/:offre" element={<Postuler />} />

          <Route
            path="/admin/*"
            element={
              <Admin>
                <AdminIndex />
              </Admin>
            }
          />

          <Route />
          <Route path="/quiz/:offre" element={<Quiz />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
