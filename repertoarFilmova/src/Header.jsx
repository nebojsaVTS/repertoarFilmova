import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Repertoar filmova</h2>

      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ textDecoration: "none", marginRight: "15px" }}>
          Home
        </Link>
        <Link
          to="/about"
          style={{ textDecoration: "none", marginRight: "15px" }}
        >
          About
        </Link>
        <Link to="/movies" style={{ textDecoration: "none" }}>
          Movies
        </Link>
      </nav>
    </header>
  );
};

export default Header;
