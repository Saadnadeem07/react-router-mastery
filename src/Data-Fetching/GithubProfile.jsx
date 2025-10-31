import React from "react";
import { useLoaderData } from "react-router-dom";

export const githubLoader = async () => {
  const res = await fetch("https://api.github.com/users/saadnadeem07");
  if (!res.ok) throw new Error("Failed to fetch GitHub data");
  const data = await res.json();
  return data;
};

const GithubProfile = () => {
  const data = useLoaderData(); // 👈 Access data fetched by the loader

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">GitHub Profile</h2>
      <img src={data.avatar_url} alt={data.login} width="100" />
      <p>Name: {data.name}</p>
      <p>Bio: {data.bio}</p>
      <p>City: {data.location}</p>
      <p>Public Repos: {data.public_repos}</p>
      <div className="flex gap-4 p-2">
        <button>
          <a
            href={data.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="my-button-style"
          >
            Visit Portfolio Website
          </a>
        </button>
        <button>
          <a
            href="https://github.com/Saadnadeem07"
            target="_blank"
            rel="noopener noreferrer"
            className="my-button-style"
          >
            Visit Github Profile
          </a>
        </button>
      </div>
    </div>
  );
};

export default GithubProfile;
