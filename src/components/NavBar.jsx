import React from "react";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <link to="/">Bitcoin Price</link>
        </li>
        <li>
          <link to="/watchlist">Watchlist</link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
