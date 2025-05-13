import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Strength {
  type: 'offense' | 'defense';
  description: string;
}

interface KeyPlayer {
  number: string;
  name: string;
  strength: string;
}

interface OpponentOverviewProps {
  teamName: string;
  gameDateTime: string;
  location: string;
  strengths: Strength[];
  keyPlayers: KeyPlayer[];
}

const OpponentOverview: React.FC<OpponentOverviewProps> = ({
  teamName,
  gameDateTime,
  location,
  strengths,
  keyPlayers
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Next Game: {teamName}</h2>
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-gray-400">{gameDateTime}</p>
            <p className="text-gray-600 dark:text-gray-400">{location}</p>
          </div>
        </div>
        <motion.button 
          className="text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Team Analysis</h3>
          <div className="space-y-4">
            {strengths.map((strength, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <span className={`inline-block px-2 py-1 rounded text-sm mb-2 ${
                  strength.type === 'offense' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {strength.type.charAt(0).toUpperCase() + strength.type.slice(1)}
                </span>
                <p className="text-gray-700 dark:text-gray-300">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Key Players</h3>
          <div className="space-y-3">
            {keyPlayers.map((player, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#2D3092] rounded-full flex items-center justify-center text-white font-semibold">
                  #{player.number}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{player.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{player.strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OpponentOverview;