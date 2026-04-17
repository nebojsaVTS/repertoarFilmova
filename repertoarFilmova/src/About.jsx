import React from "react";
import { Outlet, Link } from "react-router-dom";

const About = () => {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1>O aplikaciji</h1>
      <p>Ovde se nalaze informacije o aplikaciji i autoru.</p>

      <nav>
        <Link to="app">O aplikaciji</Link>
        <br />
        <Link to="author">O autoru</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default About;
