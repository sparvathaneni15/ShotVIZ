import React, { useState, useRef} from 'react';
import { PlayIcon } from '../icons/Icons';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoSrc: string;
  onAddTag: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, onAddTag }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // in %
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');

  const togglePlay = async () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        try {
          await video.play();
        } catch (err) {
          console.error("Playback failed:", err);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
      setCurrentTime(formatTime(video.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setTotalTime(formatTime(video.duration));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <motion.section 
          className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-video bg-black rounded-lg mb-4">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg" 
              src={videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata} 
              onClick={togglePlay}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={togglePlay}
                  className="text-white cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer" onClick={handleProgressBarClick}>
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
      </div>
      <div className="w-full lg:w-[300px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Counting Stats</h3>
        <form className="space-y-3">
          <input type="text" placeholder="Player ID" className="w-full px-3 py-2 border rounded" />
          <input type="number" placeholder="Points" className="w-full px-3 py-2 border rounded" />
          <input type="number" placeholder="Assists" className="w-full px-3 py-2 border rounded" />
          <input type="number" placeholder="Rebounds" className="w-full px-3 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoPlayer;