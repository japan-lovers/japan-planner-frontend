import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-base-100">
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
            <Link to="/">
              <li>
                <span>Home</span>
              </li>
            </Link>
            <Link to="/activities">
              <li>
                <span>All activities</span>
              </li>
            </Link>
            <Link to="/trips">
              <li>
                <span>Explore trips</span>
              </li>
            </Link>
          </ul>
        </div>
        <Link to="/">
          <span className="btn btn-ghost text-l">
            {/* <img
              className="h-10"
              src="https://firebasestorage.googleapis.com/v0/b/ironhack-projects-f2422.appspot.com/o/images%2Fironlegacy.png?alt=media&token=c90a12e9-ba9b-41fa-855f-58f25e4a8270"
            /> */}
            JAPAN TRAVEL
          </span>
        </Link>
        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li>
                <span>Home</span>
              </li>
            </Link>
            <Link to="/activities">
              <li>
                <span>All activities</span>
              </li>
            </Link>
            <Link to="/trips">
              <li>
                <span>Explore trips</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <Link to="/login">
          <span className="btn ml-4 mr-2">
            <i className="fab fa-github text-lg" />
            Login
          </span>
        </Link>
        <Link to="/signup">
          <span className="btn ml-0 mr-4">
            <i className="fab fa-github text-lg" />
            Sign up
          </span>
        </Link>
        {/* ======= AVATAR THAT SHOWS SHEN LOGGED IN  */}
        <div className="dropdown dropdown-end mr-2">
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
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
