import React, { useState } from 'react';
import { PlayIcon } from '../icons/Icons';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoSrc: string;
  onAddTag: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, onAddTag }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33); // Mock progress percentage
  const [currentTime, setCurrentTime] = useState('02:45');
  const [totalTime, setTotalTime] = useState('08:30');

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.section 
      className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-[480px] bg-black rounded-lg mb-4">
        <img 
          className="w-full h-full object-cover rounded-lg" 
          src={videoSrc} 
          alt="Basketball game footage" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="text-white"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isPlaying ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                )}
              </svg>
            </button>
            <div className="flex-1 h-2 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-[#FFB81C] rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white">{currentTime} / {totalTime}</span>
          </div>
        </div>
      </div>

      {/* Frame Controls */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
        <div className="flex space-x-3">
          <motion.button 
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous frame"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
          <motion.button 
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next frame"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
        <motion.button 
          onClick={onAddTag}
          className="bg-[#2D3092] hover:bg-[#2D3092]/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add Tag</span>
        </motion.button>
      </div>
    </motion.section>
  );
};

export default VideoPlayer;