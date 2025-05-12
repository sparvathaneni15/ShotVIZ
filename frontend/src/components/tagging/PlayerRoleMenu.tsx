import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Player {
  id: string;
  name: string;
  avatar: string;
}

interface Role {
  id: string;
  label: string;
}

interface PlayerRoleMenuProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  roles: Role[];
  onAssignRole: (playerId: string, roleId: string) => void;
}

const PlayerRoleMenu: React.FC<PlayerRoleMenuProps> = ({
  isOpen,
  onClose,
  players,
  roles,
  onAssignRole
}) => {
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
            className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-xl z-50 p-6"
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
              {players.map(player => (
                <div key={player.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-800 dark:text-white">
                      {player.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roles.map(role => (
                      <motion.button
                        key={role.id}
                        onClick={() => onAssignRole(player.id, role.id)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm text-gray-800 dark:text-white hover:bg-[#FFB81C]/10 hover:text-[#FFB81C] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {role.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlayerRoleMenu;