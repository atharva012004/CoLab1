import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // To create navigation to the login page

const Signup= () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    // Handle signup logic (e.g., send data to API)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className=" underline text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" cursor-pointer w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
