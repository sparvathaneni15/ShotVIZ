import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface FilmCardProps {
  id: number;
  session_date: string;
  video_url: string;
  notes: string;
}

const FilmCard: React.FC<FilmCardProps> = ({
  id,
  session_date,
  video_url,
  notes
}) => {
  const navigate = useNavigate();

  const handleTagClick = () => {
    navigate(`/tagging/${id}`, {
      state: {
        id: id,
        videoUrl: video_url,
        sessionDate: session_date,
        notes: notes
      }
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this session?");
    if (!confirmed) return;

    try {
      // Step 1: Delete the video file from S3
      const s3Response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete_videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_url: video_url }),
      });

      if (!s3Response.ok) {
        throw new Error('Failed to delete video from S3.');
      }

      // Step 2: Delete the session from the database
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/practice_sessions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the session.');
      }

      navigate(0); // Refresh the page
    } catch (error) {
      console.error("Deletion error:", error);
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{session_date}</h3>
            <h4 className="text-gray-600 dark:text-gray-400">{notes}</h4>
            <h4 className="text-gray-600 dark:text-gray-400">{video_url}</h4>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
          
          <motion.button
            onClick={handleTagClick}
            className="text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add Tags
          </motion.button>
          <motion.button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTrashAlt />
          </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilmCard;