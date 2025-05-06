import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QueryFormData {
  player: string;
  actionType: string;
  dateRange: string;
}

interface QueryBuilderProps {
  onGenerateReport: (formData: QueryFormData) => void;
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ onGenerateReport }) => {
  const [formData, setFormData] = useState<QueryFormData>({
    player: 'All Players',
    actionType: 'All Actions',
    dateRange: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateReport(formData);
  };

  return (
    <motion.section 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Query Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Player</label>
            <select
              name="player"
              value={formData.player}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:border-[#2D3092] focus:ring-2 focus:ring-[#2D3092] focus:ring-opacity-20 transition-all"
            >
              <option>All Players</option>
              <option>Marcus Johnson</option>
              <option>Alex Thompson</option>
              <option>Sarah Williams</option>
              <option>James Rodriguez</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Action Type</label>
            <select
              name="actionType"
              value={formData.actionType}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:border-[#2D3092] focus:ring-2 focus:ring-[#2D3092] focus:ring-opacity-20 transition-all"
            >
              <option>All Actions</option>
              <option>Shots</option>
              <option>Passes</option>
              <option>Rebounds</option>
              <option>Steals</option>
              <option>Blocks</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Date Range</label>
            <input
              type="date"
              name="dateRange"
              value={formData.dateRange}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:border-[#2D3092] focus:ring-2 focus:ring-[#2D3092] focus:ring-opacity-20 transition-all"
            />
          </div>
        </div>
        <motion.button
          type="submit"
          className="mt-4 bg-[#2D3092] text-white px-6 py-2 rounded-lg hover:bg-[#2D3092]/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Report
        </motion.button>
      </form>
    </motion.section>
  );
};

export default QueryBuilder;