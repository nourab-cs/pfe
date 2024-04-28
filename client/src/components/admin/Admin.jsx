
import { Link } from "react-router-dom";

import { FaBell } from "react-icons/fa"; // Import du logo de notification

function Admin() {
  return (
    <aside className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center">
          <FaBell className="text-gray-500 cursor-pointer mr-2" />
          <span className="text-sm text-gray-600">Notifications</span>
        </div>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin/all-users"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
            All Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/create-offre"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
            Create Offre
          </Link>
        </li>
        <li>
          <Link
            to="/admin/offres-list"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
            All Offres
          </Link>
        </li>
        <li>
          <Link
            to="/admin/stagiaires-list"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
            Stagiaires
          </Link>
        </li>
        <li>
          <Link
            to="/admin/candidats-list"
            className="block px-3 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
          >
            Candidats
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Admin;






