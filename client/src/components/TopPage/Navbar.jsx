import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">CoLab</div>
      <div className="space-x-4">
        <Link to="/signup" className="text-white hover:text-gray-200">Sign Up</Link>
        <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
        <Link
          to="/try-it"
          className="text-white hover:text-gray-200 px-4 py-2 bg-yellow-500 rounded-md"
        >
          Try It CoLab
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
