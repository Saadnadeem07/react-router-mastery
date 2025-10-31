import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="bg-[#1a1a1a] mt-4 p-4 ">
        <h1>Home</h1>

        <div className="flex gap-5">
          <button>
            <Link to={"/dashboard"}>Visit Dashboard</Link>
          </button>
          <button>
            <Link to={"/github-profile"} prefetch="intent">
              Visit Github Profile
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
