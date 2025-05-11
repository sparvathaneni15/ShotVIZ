import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showUploadButton?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, showUploadButton = false }) => {
  // Mock user data - in a real app, this would come from an auth context
  const user = {
    name: 'Coach Thompson',
    role: 'Head Coach',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar user={user} />
      
      <motion.div 
        className="flex-1 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header title={title} showUploadButton={showUploadButton} />
        <main>{children}</main>
      </motion.div>
    </div>
  );
};

export default MainLayout;