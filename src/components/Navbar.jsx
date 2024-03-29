import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Logo from "../../public/favicon.ico";
import NipponLogo from "../../public/NipponAdventure.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="flex justify-center">
      <div className="navbar bg-base-100 max-w-7xl flex justify-center items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavLink to="/">
                <li>
                  <span>Home</span>
                </li>
              </NavLink>
              <NavLink to="/activities">
                <li>
                  <span>All activities</span>
                </li>
              </NavLink>
              <NavLink to="/trips">
                <li>
                  <span>Explore trips</span>
                </li>
              </NavLink>
            </ul>
          </div>
          <NavLink to="/">
            <span className="btn btn-ghost text-l">
              <img className="h-6" src={NipponLogo} />
            </span>
          </NavLink>
          <div className="navbar-start hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <NavLink to="/activities">
                <li>
                  <span>All activities</span>
                </li>
              </NavLink>
              <NavLink to="/trips">
                <li>
                  <span>Explore trips</span>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          {!isLoggedIn && (
            <Link to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
            </Link>
          )}
          {isLoggedIn && (
            <Link to={`/user/${user._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
            </Link>
          )}
          <Link to="/">
            <button className="btn btn-outline btn-sm mx-4">Plan trip</button>
          </Link>
          {/* ======= DROPDOWN MENU FOR SMALL SCREENS  */}

          {/* <div className="dropdown dropdown-end mr-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Plan Trip
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
