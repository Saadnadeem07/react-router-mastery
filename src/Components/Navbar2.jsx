import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar2 = () => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    navigate("/user");
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    navigate("/");
    setIsLoggedIn(false);
  };
  return (
    <>
      <div className="flex gap-6 bg-white">
        <h3>
          <Link to={"/"}>Home</Link>
        </h3>
        <h3>
          <Link to={"/contact"}>Contact Us</Link>
        </h3>
        <h3>
          <Link to={"/about"}>About</Link>
        </h3>
        {isLoggedIn ? (
          <h3>
            {" "}
            <div onClick={handleLogout}>Logout</div>
          </h3>
        ) : (
          <h3>
            {" "}
            <div onClick={handleLogin}>Login</div>
          </h3>
        )}
      </div>
    </>
  );
};

export default Navbar2;
