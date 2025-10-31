import React from "react";
import Home from "../Pages/Home";
import User from "../Pages/User";
import About from "../Pages/About";
import L2 from "../Nested-Routing/L2";
import Contact from "../Pages/Contact";
import NotFound from "../Pages/NotFound";
import Navbar from "../Components/Navbar";
import DynamicUser from "../Pages/DynamicUser";
import Laptops from "../Nested-Routing/Laptops";
import Mobiles from "../Nested-Routing/Mobiles";
import Products from "../Nested-Routing/Products";
import Dashboard from "../Nested-Routing/Dashboard";
import LaptopChild from "../Nested-Routing/LaptopChild";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ReactRouterv6 = () => {
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

export default ReactRouterv6;
