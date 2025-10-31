import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="bg-[#1a1a1a] mt-4 p-4 ">
        <h1>Home</h1>

        <div>
          <button>
            <Link to={"/dashboard"}>Visit Dashboard</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
