import { Link } from "react-router-dom";


function Admin() {
  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        {/* add more profile features here  */}

        <li>
          {" "}
          <Link
            to="/admin/all-users"
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            All users
          </Link>
          
        </li>
        <li>
          {" "}
          <Link
            to="/admin/create-offre"
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            Create offre
          </Link>
          
        </li>
        <li>
          {" "}
          <Link
            to="/admin/offres-list"
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            All Offres
          </Link>
          
        </li>
        <li>
          {" "}
          <Link
            to="/admin/stagiaires-list"
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            stagiaires
          </Link>
          
        </li>
        <li>
          {" "}
          <Link
            to="/admin/candidats-list"
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            Candidats
          </Link>
          
        </li>
      </ul>
    </aside>
  );
}

export default Admin;
