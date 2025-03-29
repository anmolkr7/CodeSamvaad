import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const navigate= useNavigate();
    function submitHandler(e){
        e.preventDefault(); // Prevent default form submission
        axios.post("/users/register", { email, password })
        .then((response) => {
            console.log(response.data);
            navigate("/"); // Redirect to home page after successful registration
        }).catch((error) => {
            console.error(error.response.data);
            // Handle error (e.g., show error message)
        })
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
                onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? {" "}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
