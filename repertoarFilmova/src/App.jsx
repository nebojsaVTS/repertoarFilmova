import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Movies from "./Movies";
import AppInfo from "./AppInfo";
import AuthorInfo from "./AuthorInfo";

const App = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/about" element={<About />}>
            <Route path="app" element={<AppInfo />} />
            <Route path="author" element={<AuthorInfo />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
