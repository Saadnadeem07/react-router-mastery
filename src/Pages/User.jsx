import React from "react";
import { Link } from "react-router-dom";

// 👥 User Component
// Displays a list of users and links to each user's details page
const User = () => {
  // Dummy data to simulate user records
  const users = [
    { id: 1, name: "Saad Nadeem", email: "saad@gmail.com" },
    { id: 2, name: "Fahad Nadeem", email: "fahad@gmail.com" },
    { id: 3, name: "Hasnat Nadeem", email: "hasnat@gmail.com" },
  ];

  return (
    <>
      <h2>All Users</h2>

      {/* Loop through each user and display their name as a clickable link */}
      {users.map((x) => (
        <div key={x.id}>
          {/* Link navigates to /user/{id} (dynamic route) */}
          <Link to={`/user/${x.id}`}>
            <h4>{x.name}</h4>
          </Link>
        </div>
      ))}
    </>
  );
};

export default User;
