import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import DateRangeFilter from '../components/films/DateRangeFilter';
import FilmCard from '../components/films/FilmCard';
import { motion } from 'framer-motion';

interface FilmSession {
  id: string;
  date: string;
  duration: string;
  thumbnail: string;
  focusArea: string;
  players: Array<{
    id: string;
    avatar: string;
  }>;
  status: 'Analyzed' | 'Pending' | 'In Progress';
}

const FilmPage: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data - in a real app, this would come from an API
  const sessions: FilmSession[] = [
    {
      id: '1',
      date: 'May 5, 2025',
      duration: '1h 45m',
      thumbnail: 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      focusArea: 'Offense Drills',
      players: [
        { id: '1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '3', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
        { id: '4', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' }
      ],
      status: 'Analyzed'
    },
    {
      id: '2',
      date: 'May 3, 2025',
      duration: '2h 15m',
      thumbnail: 'https://images.pexels.com/photos/3755442/pexels-photo-3755442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      focusArea: 'Defense Fundamentals',
      players: [
        { id: '1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }
      ],
      status: 'In Progress'
    },
    {
      id: '3',
      date: 'May 1, 2025',
      duration: '1h 30m',
      thumbnail: 'https://images.pexels.com/photos/3755443/pexels-photo-3755443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      focusArea: 'Shooting Practice',
      players: [
        { id: '1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '3', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' }
      ],
      status: 'Analyzed'
    }
  ];

  return (
    <MainLayout title="Film Library" showUploadButton>
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
          <FilmCard key={session.id} {...session} />
        ))}
      </motion.div>
    </MainLayout>
  );
};

export default FilmPage;