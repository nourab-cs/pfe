import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/userStore";

import { Button } from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";


function Navbarr () {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar>
       <NavbarBrand>
      <Link  href="/">
        <img className="h-10" src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Ooredoo_logo.svg" alt="Ooredoo Logo" />
      </Link>
      </NavbarBrand>
      {/* <div className="lg:hidden">
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
        } absolute top-0 left-0  w-full mt-16 lg:mt-0 lg:relative lg:flex lg:flex-row lg:items-center lg:w-auto`}
      >
         */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">

        <NavbarItem>
          <Link
           href="/"
           
          >
            Accueil
          </Link>
        </NavbarItem>
        {user?.role != "admin" && (
        <NavbarItem>
        <Link
              href="/alloffres"
              
             
            >
              Offres de stages 
            </Link>
            </NavbarItem>
        )}

        {user.email && (
        <NavbarItem>
        <Link
              href="/profile"
              
            >
              Profile
            </Link>
            </NavbarItem>
        )}
        {(user.role == "user" ) && (
       
       <NavbarItem>
       <Link
              href="/mescandidatures"
              
            >
              Mes candidatures
            </Link>
            </NavbarItem>
        )}
        {(user.role == "admin" || user.role == "recruter") && (
       <NavbarItem>
       <Link
              href="/admin/dashbord"
              
            >
              Dashbord
            </Link>
            </NavbarItem>
        )}
              </NavbarContent>

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

<NavbarContent justify="end">
              {!user._id ? (
        <NavbarItem className="hidden lg:flex">    


            <Button
              onClick={() => {
                navigate("/login");
              }}
              radius="full"
              color="primary"
            >
              Connexion
            </Button>
                        </NavbarItem>


           
          ) : (
            <NavbarItem>

            <Button
              onClick={() => {
                import("../../services/aut.services").then(async (module) => {
                  await module.logout();
                  setUser({});
                   navigate("/login");
                });
              }}
              radius="full"
              variant="flat"
              color="primary"

            >
              Déconnexion
            </Button>
            </NavbarItem>

          )}
      </NavbarContent>
    </Navbar>
  );
}

export default Navbarr;
