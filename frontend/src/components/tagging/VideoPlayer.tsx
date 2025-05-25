import React, { useState, useRef, useEffect} from 'react';
import { PlayIcon } from '../icons/Icons';
import { motion } from 'framer-motion';
import axios from 'axios';

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({videoSrc}) => {
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
          <div className="relative aspect-video bg-black rounded-lg mb-1">
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
        </motion.section>
      </div>
    </div>
  );
};

export default VideoPlayer;