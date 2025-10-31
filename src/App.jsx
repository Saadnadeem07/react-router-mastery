import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import User from "./Pages/User";
import DynamicUser from "./Pages/DynamicUser";

// Main App Component
// This component defines all routes of the application using React Router
const App = () => {
  return (
    <>
      <Router>
        {/* Navbar appears on every page */}
        <Navbar />

        {/* Routes handle which component to render for each URL */}
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Route showing a list of users */}
          <Route path="/user" element={<User />} />

          {/* Dynamic route: shows details for a specific user (based on id) */}
          <Route path="/user/:id" element={<DynamicUser />} />

          {/* Wildcard route: handles all undefined URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
