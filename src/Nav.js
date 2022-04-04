import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="header flex bg-neutral-900 p-8">
      <h2 className="text-2xl font-bold text-cyan-500">Photo Voter</h2>
      <div className="nav flex items-center space-x-5 text-xl ml-96 pl-96">
        <Link to="/">Vote</Link>
        <Link to="/upload">Upload</Link>
      </div>
    </div>
  );
};
