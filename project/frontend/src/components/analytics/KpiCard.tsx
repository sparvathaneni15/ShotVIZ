import React from 'react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = "#2D3092", 
  delay = 0 
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
        <div className="text-[#FFB81C]">{icon}</div>
      </div>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
      <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
    </motion.div>
  );
};

export default KpiCard;