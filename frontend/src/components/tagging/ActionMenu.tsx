import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Action {
  id: string;
  label: string;
  category: string;
}

interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: Action) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ isOpen, onClose, onSelectAction }) => {
  const actions: Action[] = [
    { id: '1', label: '3-Point Shot', category: 'Offense' },
    { id: '2', label: 'Layup', category: 'Offense' },
    { id: '3', label: 'Mid-Range Shot', category: 'Offense' },
    { id: '4', label: 'Block', category: 'Defense' },
    { id: '5', label: 'Steal', category: 'Defense' },
    { id: '6', label: 'Rebound', category: 'Defense' },
    { id: '7', label: 'Assist', category: 'Playmaking' },
    { id: '8', label: 'Pick and Roll', category: 'Playmaking' }
  ];

  const categories = Array.from(new Set(actions.map(action => action.category)));

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
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Select Action</h2>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                ×
              </button>
            </div>

            <div className="space-y-6">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{category}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {actions
                      .filter(action => action.category === category)
                      .map(action => (
                        <motion.button
                          key={action.id}
                          onClick={() => onSelectAction(action)}
                          className="flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-[#FFB81C]/10 hover:text-[#FFB81C] transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {action.label}
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

export default ActionMenu;