import React from "react";
import { Outlet, Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <div className="bg-[#1a1a1a] mt-4 p-4 ">
        <h1>Welcome to Dashboard</h1>

        <div className="flex flex-col bg-amber-100 p-1 px-16">
          <div className="flex justify-between">
            <Link className="text-black" to="">
              Mobiles
            </Link>
            <Link className="text-black" to="laptop">
              Laptops
            </Link>
            <Link className="text-black" to="product">
              Products
            </Link>
          </div>
          <p className="text-black">
            The Content below this is shown with the help of nested routing - by
            default it shows Mobile Section if you click any other one it will
            show that too
          </p>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
