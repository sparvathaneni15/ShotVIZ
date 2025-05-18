import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import DateRangeFilter from '../components/practice_sessions/DateRangeFilter';
import FilmCard from '../components/practice_sessions/FilmCard';
import { motion } from 'framer-motion';

interface PracticeSession {
  id: number;
  session_date: string;
  videoUrl: string;
  notes: string;
}

const PracticeSessionPage: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/practice_sessions/`);
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

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
        {sessions.map((session) => (
          <FilmCard 
            id={session.id}
            date={session.session_date}
            videoUrl={session.videoUrl}
            notes={session.notes}/>
        ))}
      </motion.div>
    </MainLayout>
  );
};

export default PracticeSessionPage;