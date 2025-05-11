import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Player {
  id: string;
  avatar: string;
}

interface FilmCardProps {
  id: string;
  date: string;
  duration: string;
  thumbnail: string;
  focusArea: string;
  players: Player[];
  status: 'Analyzed' | 'Pending' | 'In Progress';
}

const FilmCard: React.FC<FilmCardProps> = ({
  id,
  date,
  duration,
  thumbnail,
  focusArea,
  players,
  status
}) => {
  const navigate = useNavigate();

  const getStatusClass = (status: FilmCardProps['status']) => {
    switch (status) {
      case 'Analyzed':
        return 'bg-green-500/20 text-green-500';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-500';
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
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={`Practice session - ${date}`} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(status)}`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{focusArea}</h3>
            <p className="text-gray-600 dark:text-gray-400">{date}</p>
          </div>
          <span className="text-gray-600 dark:text-gray-400">{duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {players.slice(0, 3).map((player) => (
              <img 
                key={player.id}
                src={player.avatar} 
                alt="Player" 
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" 
              />
            ))}
            {players.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">+{players.length - 3}</span>
              </div>
            )}
          </div>
          
          <motion.button
            onClick={() => navigate(`/tagging/${id}`)}
            className="text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilmCard;