import React from 'react';
import { motion } from 'framer-motion';

interface TagFlowProps {
  activeStep: number;
}

const TagFlow: React.FC<TagFlowProps> = ({ activeStep }) => {
  const steps = [
    { id: 1, label: 'Select Action' },
    { id: 2, label: 'Assign Roles' },
    { id: 3, label: 'Result' }
  ];

  return (
    <motion.section 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Action Flow</h2>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div 
              className={`tag-node p-3 rounded-lg ${
                step.id === activeStep 
                  ? 'bg-[#FFB81C] text-gray-900' 
                  : step.id < activeStep 
                    ? 'bg-[#2D3092] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              animate={{ 
                scale: step.id === activeStep ? [1, 1.05, 1] : 1,
                transition: { duration: 0.5, repeat: step.id === activeStep ? Infinity : 0, repeatType: 'reverse' }
              }}
            >
              {step.label}
            </motion.div>
            
            {index < steps.length - 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
};

export default TagFlow;