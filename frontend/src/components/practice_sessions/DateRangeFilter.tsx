import React from 'react';
import { motion } from 'framer-motion';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApplyFilter: () => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filter Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
            Start Date
          </label>
          <input
            type="date"
            onChange={(e) => onStartDateChange(e.target.value)}
            placeholder="Select start date"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:border-[#FFB81C] focus:ring-2 focus:ring-[#FFB81C] focus:ring-opacity-20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
            End Date
          </label>
          <input
            type="date"
            onChange={(e) => onEndDateChange(e.target.value)}
            placeholder="Select end date"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:border-[#FFB81C] focus:ring-2 focus:ring-[#FFB81C] focus:ring-opacity-20 transition-all"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={onApplyFilter}
          className="bg-[#2D3092] hover:bg-[#2D3092]/90 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </motion.div>
  );
};

export default DateRangeFilter;