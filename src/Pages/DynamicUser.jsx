import React from "react";
import { Link } from "react-router-dom";

import { useNavigate, useLocation, useParams } from "react-router-dom";
// 👤 DynamicUser Component
// Displays details of a single user based on the dynamic route parameter (:id)
const DynamicUser = () => {
  // Dummy user data
  const users = [
    { id: 1, name: "Saad Nadeem", email: "saad@gmail.com" },
    { id: 2, name: "Fahad Nadeem", email: "fahad@gmail.com" },
    { id: 3, name: "Hasnat Nadeem", email: "hasnat@gmail.com" },
  ];

  // Extract the 'id' from the URL using useParams()
  let { id } = useParams();
  let navigate = useNavigate();

  // useParams returns strings, so we convert it to an integer
  const specificUser = users.find((user) => user.id === parseInt(id));

  // useLocation gives current path info (useful for debugging or analytics)
  console.log("useLocation:", useLocation());
  console.log("useLocation:", useNavigate());
  console.log("specificUser:", specificUser);

  // If user not found (e.g., /user/99), display a fallback message
  if (!specificUser) {
    return <h2>User not found</h2>;
  }

  return (
    <>
      <h2>Name: {specificUser.name}</h2>
      <h2>Email: {specificUser.email}</h2>
      <div className="flex gap-4">
        <button onClick={() => navigate("/")}>Return Home</button>
        <button onClick={() => navigate("/contact")}>
          Return to Contact Us
        </button>
        {/* dont use Link here  */}
        {/* <button>
          <Link to={"/contact"}>Contact Us</Link>
        </button> */}
      </div>
    </>
  );
};

export default DynamicUser;

// | If...                                                     | Use              |
// | --------------------------------------------------------- | ---------------- |
// | The user **clicks a link or button** to go to a page      | 🟩 `Link`        |
// | You want to **go to a page using code** (not by clicking) | 🟦 `useNavigate` |
