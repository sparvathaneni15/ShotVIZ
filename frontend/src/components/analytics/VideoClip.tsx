import React from 'react';
import { PlayIcon } from '../icons/Icons';
import { motion } from 'framer-motion';

interface VideoClipProps {
  title: string;
  date: string;
  onClick: () => void;
  delay?: number;
}

const VideoClip: React.FC<VideoClipProps> = ({ title, date, onClick, delay = 0 }) => {
  return (
    <motion.div 
      className="flex items-center space-x-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-32 h-20 bg-gray-200 dark:bg-gray-600 rounded-lg relative flex items-center justify-center">
        <PlayIcon className="text-gray-600 dark:text-gray-400" />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400">{date}</p>
      </div>
    </motion.div>
  );
};

export default VideoClip;