import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import AllUser from "./AllUser";
import CreateOffre from "../offre/CreateOffre";

function AdminIndex() {
  return (
    <Routes>
      <Route path="/dashbord" element={<Admin />} />
      <Route path="/all-users" element={<AllUser />} />
      <Route path="/create-offre" element={<CreateOffre />} />

    </Routes>
  );
}

export default AdminIndex;
