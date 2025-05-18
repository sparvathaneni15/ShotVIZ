import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface FilmCardProps {
  id: number;
  date: string;
  videoUrl: string;
  notes: string;
}

const FilmCard: React.FC<FilmCardProps> = ({
  id,
  date,
  notes
}) => {
  const navigate = useNavigate();


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
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{date}</h3>
            <h4 className="text-gray-600 dark:text-gray-400">{notes}</h4>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
          
          <motion.button
            onClick={() => navigate(`/tagging/${id}`)}
            className="text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add Tags
          </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilmCard;