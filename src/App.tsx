import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

// Routes
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
