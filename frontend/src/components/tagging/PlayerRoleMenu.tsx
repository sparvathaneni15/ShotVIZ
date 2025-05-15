import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Player {
  id: string;
  jersey_no: string;
  first_name: string;
  last_name: string;
  position: string;
}

interface Role {
  id: string;
  name: string;
}

interface PlayerRoleMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignRole: (playerId: string, roleId: string) => void;
  onOpenResultMenu: () => void;
}

const PlayerRoleMenu: React.FC<PlayerRoleMenuProps> = ({isOpen, onClose, onAssignRole, onOpenResultMenu}) => {
  const [isPlayerRoleMenuOpen, setIsPlayerRoleMenuOpen] = useState(false);
    
    const [players, setPlayers] = useState<Player[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
  
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const response = await axios.get<Player[]>('http://localhost:8000/players/all');
          setPlayers(response.data);
        } catch (error) {
          console.error('Failed to fetch players:', error);
        }
      };
  
      const fetchRoles = async () => {
        try {
          const response = await axios.get<Role[]>('http://localhost:8000/roles/all');
          setRoles(response.data);
        } catch (error) {
          console.error('Failed to fetch roles:', error);
        }
      };
  
      fetchPlayers();
      fetchRoles();
    }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-xl z-50 p-6 max-h-[80vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Assign Roles</h2>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                ×
              </button>
            </div>

          <div className="space-y-4">
            {roles.map(role => (
              <div key={role.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="font-semibold text-gray-800 dark:text-white mb-2">{role.name}</div>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {players.map(player => (
                    <button
                      key={player.id}
                      onClick={() => onAssignRole(player.id, role.id)}
                      className="flex items-center space-x-3 w-full text-left px-2 py-1 rounded hover:bg-[#FFB81C]/10 hover:text-[#FFB81C] transition-colors"
                    >
                      <span className="text-gray-800 dark:text-white">{player.first_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={onOpenResultMenu}
              className="px-4 py-2 bg-[#FFB81C] text-white font-semibold rounded hover:bg-[#e6a700] transition-colors"
            >
              Assign Result
            </button>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlayerRoleMenu;