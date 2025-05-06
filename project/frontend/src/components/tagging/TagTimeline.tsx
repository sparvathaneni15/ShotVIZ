import React from 'react';
import { motion } from 'framer-motion';

interface Tag {
  color: string;
  label: string;
}

interface TimelineItem {
  id: string;
  timestamp: string;
  tags: Tag[];
}

interface TagTimelineProps {
  items: TimelineItem[];
  onEdit: (id: string) => void;
}

const TagTimeline: React.FC<TagTimelineProps> = ({ items, onEdit }) => {
  return (
    <motion.section 
      className="bg-white dark:bg-gray-800 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tagged Actions</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div 
            key={item.id}
            className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <span className="text-gray-600 dark:text-gray-400">{item.timestamp}</span>
            
            {item.tags.map((tag, tagIndex) => (
              <div 
                key={tagIndex}
                className={`tag ${tag.color} px-3 py-1 rounded`}
              >
                {tag.label}
              </div>
            ))}
            
            <motion.button 
              onClick={() => onEdit(item.id)}
              className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Edit tag"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TagTimeline;