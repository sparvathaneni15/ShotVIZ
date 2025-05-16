import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldIcon, HomeIcon, VideoIcon, ChartIcon, UsersIcon } from '../icons/Icons';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <HomeIcon /> },
  { path: '/practice-sessions', label: 'Library', icon: <VideoIcon /> },
  { path: '/analytics', label: 'Analytics', icon: <ChartIcon /> },
  { path: '/team', label: 'Team', icon: <UsersIcon /> },
];

interface SidebarProps {
  user: {
    name: string;
    role: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  return (
    <motion.nav 
      className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col h-screen transition-colors duration-300 ease-in-out"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3 mb-8">
        <ShieldIcon className="text-[#2D3092] text-2xl" />
        <span className="text-gray-900 dark:text-white font-bold">UCSD Athletics</span>
      </div>

      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-white bg-[#2D3092]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[#2D3092] -z-10"
                  layoutId="activeNavBackground"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;