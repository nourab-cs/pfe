import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
      <Link className="text-3xl font-bold leading-none" to="/">
        <svg className="h-10" alt="logo" viewBox="0 0 10240 10240">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 231 463 19 42 37 79 40 82 3 3 57 93 120 200 236 396 299 504 400 729 118 287 232 655 298 1010 33 192 49 298 69 492 3 39 9 97 12 130 8 72 8 416 0 495 -18 149 -54 259 -128 375 -154 236 -418 413 -738 488 -114 25 -313 51 -410 58 -40 3 -94 10 -120 15 -117 20 -257 40 -357 51 -67 7 -102 14 -130 20 -25 5 -51 10 -58 10 -6 0 -32 8 -57 18 -84 30 -350 140 -491 203 -158 74 -376 177 -458 223 -90 51 -249 131 -295 150 -26 10 -52 20 -58 23 -16 8 -284 130 -355 163 -148 65 -366 155 -465 197 -84 34 -257 104 -275 107 -3 1 -45 -31 -92 -73z"
            fill="#000000"
          />
        </svg>
      </Link>
      <div className="lg:hidden">
        <button
          className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500"
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
        } absolute top-0 left-0 bg-white w-full mt-16 lg:mt-0 lg:relative lg:flex lg:flex-row lg:items-center lg:w-auto`}
      >
        <li className="lg:ml-12">
          <Link
            to="/"
            className="text-indigo-500 hover:text-black px-4 py-2 block"
          >
            Home
          </Link>
        </li>
        <li className="lg:ml-12">
          <a
            href="#"
            className="text-indigo-500 hover:text-black px-4 py-2 block"
          >
            About
          </a>
        </li>
        <li className="lg:ml-12">
          <a
            href="#"
            className="text-indigo-500 hover:text-black px-4 py-2 block"
          >
            Services
          </a>
        </li>
        <li className="lg:ml-12">
          <a
            href="#"
            className="text-indigo-500 hover:text-black px-4 py-2 block"
          >
            Contact
          </a>
        </li>

        <li className="lg:ml-12">
          <button
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
