import { Link } from "react-router-dom";
import { logout } from "../../services/aut.services";
import { useUser } from "../../stores/userStore";

const Sidebar = () => {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        {/* add more profile features here  */}

        <li>
          {" "}
          <Link
            to="/"
            onClick={async () => {
              await logout();
              setUser({});
            }}
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
