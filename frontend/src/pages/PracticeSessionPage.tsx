import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import DateRangeFilter from '../components/practice_sessions/DateRangeFilter';
import FilmCard from '../components/practice_sessions/FilmCard';
import { motion } from 'framer-motion';

const PracticeSessionPage: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <MainLayout title="Library" showUploadButton>
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
      </motion.div>
    </MainLayout>
  );
};

export default PracticeSessionPage;