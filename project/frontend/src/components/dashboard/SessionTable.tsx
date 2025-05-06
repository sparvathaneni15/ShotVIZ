import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Player {
  id: string;
  avatar: string;
}

interface Session {
  id: string;
  date: string;
  duration: string;
  focusArea: string;
  players: Player[];
  status: 'Analyzed' | 'Pending' | 'In Progress';
}

interface SessionTableProps {
  sessions: Session[];
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions }) => {
  const navigate = useNavigate();

  const getStatusClass = (status: Session['status']) => {
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
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Practice Sessions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-4">Date</th>
              <th className="pb-4">Duration</th>
              <th className="pb-4">Focus Area</th>
              <th className="pb-4">Players</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-white">
            {sessions.map((session, index) => (
              <motion.tr 
                key={session.id} 
                className="border-b border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <td className="py-4">{session.date}</td>
                <td>{session.duration}</td>
                <td>{session.focusArea}</td>
                <td>
                  <div className="flex -space-x-2">
                    {session.players.slice(0, 3).map((player) => (
                      <img 
                        key={player.id}
                        src={player.avatar} 
                        alt="Player" 
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" 
                      />
                    ))}
                    {session.players.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <span className="text-xs">+{session.players.length - 3}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`px-3 py-1 rounded-full ${getStatusClass(session.status)}`}>
                    {session.status}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => navigate(`/tagging/${session.id}`)}
                    className="text-[#FFB81C] hover:text-[#FFB81C]/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SessionTable;