import React from "react";
import {
  Link,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import User from "../Pages/User";
import DynamicUser from "../Pages/DynamicUser";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Nested-Routing/Dashboard";
import Mobiles from "../Nested-Routing/Mobiles";
import Products from "../Nested-Routing/Products";
import LaptopChild from "../Nested-Routing/LaptopChild";
import Laptops from "../Nested-Routing/Laptops";
import L2 from "../Nested-Routing/L2";
import Navbar from "../Components/Navbar";
import GithubProfile, { githubLoader } from "../Data-Fetching/GithubProfile";
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
const routing = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/user", element: <User /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/user/:id", element: <DynamicUser /> },
      {
        path: "/github-profile",
        element: <GithubProfile />,
        loader: githubLoader,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <Mobiles /> },
          { path: "product", element: <Products /> },
          {
            path: "laptop",
            element: <Laptops />,
            children: [
              { index: true, element: <LaptopChild /> },
              { path: "l2", element: <L2 /> },
            ],
          },
        ],
      },
    ],
  },
]);

const ReactRouterv7 = () => {
  return (
    <>
      <RouterProvider router={routing} />
    </>
  );
};

export default ReactRouterv7;
