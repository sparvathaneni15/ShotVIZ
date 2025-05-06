import React from 'react';
import { motion } from 'framer-motion';

interface ActionCardProps {
  title: string;
  image: string;
  successRate: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, image, successRate }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Most Successful Action</h2>
      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <h3 className="text-white font-bold">{title}</h3>
          <p className="text-gray-300">Success Rate: {successRate}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionCard;