import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  target: number;
  unit: string;
}

interface TeamStatsProps {
  stats: StatItem[];
}

const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Team Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const percentage = (stat.value / stat.target) * 100;
          const isAboveTarget = stat.value >= stat.target;
          
          return (
            <motion.div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-600 dark:text-gray-400">{stat.label}</h3>
                {isAboveTarget ? (
                  <ArrowUp className="text-green-500" size={20} />
                ) : (
                  <ArrowDown className="text-red-500" size={20} />
                )}
              </div>
              
              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stat.value}{stat.unit}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  / {stat.target}{stat.unit} target
                </span>
              </div>
              
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <motion.div 
                  className={isAboveTarget ? 'h-full rounded-full bg-green-500' : 'h-full rounded-full bg-[#FFB81C]'}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TeamStats;