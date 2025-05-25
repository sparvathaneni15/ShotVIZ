import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, UploadIcon } from '../icons/Icons';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  showUploadButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showUploadButton = false }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-4">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h1>
      <div className="flex items-center space-x-4">
        <motion.button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.button>
        
        {showUploadButton && (
          <motion.button 
            onClick={() => navigate('/upload')}
            className="bg-[#FFB81C] hover:bg-[#FFB81C]/90 text-gray-900 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UploadIcon className="text-gray-900" />
            <span>Upload New Film</span>
          </motion.button>
        )}
      </div>
    </header>
  );
};

export default Header;