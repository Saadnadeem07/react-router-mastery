import React from "react";
import { Link } from "react-router-dom";
//If you want an logic of isActive then use NavLink instead of Link
const Navbar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "400px",
          backgroundColor: "white",
        }}
      >
        <h2>
          <Link to={"/"}>Home</Link>
        </h2>
        <h2>
          <Link to={"/about"}>About</Link>
        </h2>

        <h2>
          <Link to={"/contact"}>Contact Us</Link>
        </h2>
      </div>
    </>
  );
};

export default Navbar;
