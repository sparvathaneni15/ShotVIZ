import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { ShieldIcon, EnvelopeIcon, LockIcon, Moon, Sun } from '../components/icons/Icons';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    console.log('Login successful:', data);
    navigate('/'); // Redirect after successful login
  } catch (error) {
    console.error('Login failed:', error);
    if (error instanceof Error) {
      alert('Login failed: ' + error.message);
    } else {
      alert('Login failed: An unknown error occurred');
    }
  }
};

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <ShieldIcon className="text-[#2D3092] text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">UCSD Athletics</h1>
          <p className="text-gray-600 dark:text-gray-400">Performance Analytics Portal</p>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:border-[#FFB81C] focus:ring-2 focus:ring-[#FFB81C] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="name@ucsd.edu"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:border-[#FFB81C] focus:ring-2 focus:ring-[#FFB81C] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#2D3092] focus:ring-[#2D3092]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </label>
              </div>
              <span className="text-sm text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors cursor-pointer">
                Forgot password?
              </span>
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-[#2D3092] hover:bg-[#2D3092]/90 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              whileTap={{ scale: 0.95 }}
            >
              <span>Sign In</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <span className="text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors cursor-pointer">
              Request Access
            </span>
          </p>
        </div>

        {/* Theme Toggle */}
        <motion.div 
          className="absolute top-4 right-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default LoginPage;