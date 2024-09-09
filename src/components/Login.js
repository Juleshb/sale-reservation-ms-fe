import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // For redirection after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useContext(AuthContext); // Access auth context
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4700/api/users/login', {
        email,
        password,
      });

      const { token, user } = response.data; // Extract token and user info from the response

      // Save token and user info in context or localStorage
      setAuthData({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

      // Redirect the user to the homepage or dashboard
      navigate('/admin');
    } catch (error) {
      setMessage('Invalid email or password.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
