import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import Navbar2 from "./Components/Navbar2";
import User from "./Pages/User";
import DynamicUser from "./Pages/DynamicUser";
//nested routing imports
import Dashboard from "./Nested-Routing/Dashboard";
import Laptops from "./Nested-Routing/Laptops";
import Mobiles from "./Nested-Routing/Mobiles";
import Products from "./Nested-Routing/Products";
import LaptopChild from "./Nested-Routing/LaptopChild";
import L2 from "./Nested-Routing/L2";

// Main App Component
// This component defines all routes of the application using React Router
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:id" element={<DynamicUser />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Mobiles />} />
            <Route path="product" element={<Products />} />
            <Route path="laptop" element={<Laptops />}>
              <Route index element={<LaptopChild />} />
              <Route path="laptop-child" element={<L2 />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
