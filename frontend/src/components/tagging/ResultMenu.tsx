import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Result {
  id: string;
  name: string;
}

interface ResultMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: Result) => void;
}

const ResultMenu: React.FC<ResultMenuProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get<Result[]>('http://localhost:8000/results/all');
        setResults(response.data);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      }
    };

    fetchResults();
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
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Select Result</h2>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map(result => (
                <motion.button
                  key={result.id}
                  onClick={() => onSelectResult(result)}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-left text-gray-800 dark:text-white hover:bg-[#FFB81C]/10 hover:text-[#FFB81C] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {result.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResultMenu;