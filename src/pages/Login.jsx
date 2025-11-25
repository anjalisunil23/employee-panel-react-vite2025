import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = 'demo-token-' + Date.now();
    localStorage.setItem('auth', token);
    if (onLogin) onLogin(token);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm sm:max-w-md p-6 sm:p-8 
          bg-white/80 dark:bg-gray-800/80 
          backdrop-blur-xl shadow-xl rounded-2xl 
          border border-white/30 dark:border-gray-700
        "
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Sign in to <span className="text-blue-600">Naturals</span>
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              w-full px-4 py-3 rounded-lg 
              border border-gray-300 dark:border-gray-700 
              bg-white dark:bg-gray-900 
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 
              transition
            "
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg 
              border border-gray-300 dark:border-gray-700 
              bg-white dark:bg-gray-900 
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 
              transition
            "
          />
        </div>

        {/* Buttons */}
        <div className="space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0">

          <button
            type="submit"
            className="
              w-full sm:w-auto px-6 py-3 
              bg-blue-600 hover:bg-blue-700 
              text-white font-medium rounded-lg 
              transition active:scale-95
            "
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setEmail('demo@example.com');
              setPassword('demo');
            }}
            className="
              w-full sm:w-auto text-center px-6 py-3 
              text-gray-700 dark:text-gray-300 
              hover:text-blue-600 dark:hover:text-blue-400 
              transition
            "
          >
            Fill Demo
          </button>

        </div>
      </form>
    </div>
  );
}
