import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
      <nav>
        <NavLink
          to="/"
          /* add styling to Navlink */
          className="nav-link"
        >
          Login
        </NavLink>
        <NavLink
          to="/search"
          className="nav-link"
        >
          Search
        </NavLink>
        <NavLink
          to="/mymovies"
          className="nav-link"
        >
          My Movies
        </NavLink>
      </nav>
    );
  };
  
  export default NavBar