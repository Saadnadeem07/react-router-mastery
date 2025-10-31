import React from "react";
import { Outlet } from "react-router-dom";

const Laptops = () => {
  return (
    <>
      <div className="mt-4">Displaying Laptops</div>
      <Outlet />
    </>
  );
};

export default Laptops;
