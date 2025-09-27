import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar-box">
      <ul>
        <li>
          <Link to="/">Bitcoin Price</Link>
        </li>
        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
