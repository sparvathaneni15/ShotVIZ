import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  label: string;
  value: string | number;
}

interface PerformerCardProps {
  name: string;
  image: string;
  rank: number;
  stats: StatItem[];
}

const PerformerCard: React.FC<PerformerCardProps> = ({ name, image, rank, stats }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Top Performer</h2>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img 
            className="w-32 h-32 rounded-xl object-cover" 
            src={image} 
            alt={name} 
          />
          <div className="absolute -top-2 -right-2 bg-[#2D3092] text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span>#{rank}</span>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{name}</h3>
          <div className="space-y-2">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                <span className="text-gray-900 dark:text-white font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformerCard;