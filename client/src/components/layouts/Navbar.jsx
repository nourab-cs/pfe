import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../stores/userStore";

function Navbar() {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-gray-100">
      <Link className="text-3xl font-bold leading-none" to="/">
        <img className="h-10" src="images/ooredoo.png" alt="Ooredoo Logo" />
      </Link>

      <div className="lg:hidden">
        <button
          className="navbar-burger flex items-center py-2 px-3 text-red-500 rounded border border-red-500"
          onClick={toggleMenu}
        >
          <svg
            className="w-3 h-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Menu</title>
            <path d="M0 0h20v2H0zm0 7h20v2H0zm0 7h20v2H0z" />
          </svg>
        </button>
      </div>

      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-0 left-0 bg-gray-100 w-full mt-16 lg:mt-0 lg:relative lg:flex lg:flex-row lg:items-center lg:w-auto`}
      >
        <li className="lg:ml-12">
          <Link
            to="/"
            className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
          >
            Accueil
          </Link>
        </li>
        {user?.role != "admin" && (
          <li className="lg:ml-12">
            <Link
              to="/alloffres"
              className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
            >
              Offres de stages 
            </Link>
          </li>
        )}

        {user.email && (
          <li className="lg:ml-12">
            <Link
              to="/profile"
              className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
            >
              Profile
            </Link>
          </li>
        )}
        {(user.role == "user" ) && (
       
          <li className="lg:ml-12">
            <Link
              to="/mescandidatures"
              className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
            >
              Mes candidatures
            </Link>
          </li>
        )}
        {(user.role == "admin" || user.role == "recruter") && (
          <li className="lg:ml-12">
            <Link
              to="/admin/dashbord"
              className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
            >
              Dashbord
            </Link>
          </li>
        )}
        {/* <li className="lg:ml-12">
          <a
            href="#"
            className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
          >
            Services
          </a>
        </li>
        <li className="lg:ml-12">
          <a
            href="#"
            className="text-red-500 text-gray-500 px-4 py-2  hover:text-black"
          >
            Contact
          </a>
        </li> */}

        <li className="lg:ml-12">
          {!user._id ? (
            <button
              onClick={() => {
                navigate("/login");
              }}
              type="button"
              className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              connexion
            </button>
          ) : (
            <button
              onClick={() => {
                import("../../services/aut.services").then(async (module) => {
                  await module.logout();
                  setUser({});
                });
              }}
              type="button"
              className="text-white bg-red-500  hover:bg-red-700 focus:ring-4 focus:ring-red-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700"
            >
              déconnexion
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
