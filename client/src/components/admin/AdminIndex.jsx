import { Routes, Route, Link } from "react-router-dom";
import Admin from "./Admin";
import AllUser from "./AllUser";

function AdminIndex() {
  return (
    <div>
        <Routes>
            <Route path="/dashbord" element={<Admin/>} />
            <Route path="/all-users" element={<AllUser/>} />

        </Routes>
    </div>
  )
}

export default AdminIndex