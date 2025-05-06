import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import PerformerCard from '../components/dashboard/PerformerCard';
import ActionCard from '../components/dashboard/ActionCard';
import SessionTable from '../components/dashboard/SessionTable';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  // Mock data for top performer
  const topPerformer = {
    name: 'Marcus Johnson',
    image: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rank: 1,
    stats: [
      { label: 'Points', value: 28 },
      { label: 'Assists', value: 7 },
      { label: 'FG%', value: '65%' }
    ]
  };

  // Mock data for successful action
  const successfulAction = {
    title: 'Pick and Roll - Right Side',
    image: 'https://images.pexels.com/photos/2258257/pexels-photo-2258257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    successRate: '78%'
  };

  // Mock data for practice sessions
  const sessions = [
    {
      id: '1',
      date: 'May 5, 2025',
      duration: '1h 45m',
      focusArea: 'Offense Drills',
      players: [
        { id: '1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '3', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
        { id: '4', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
        { id: '5', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' },
        { id: '6', avatar: 'https://randomuser.me/api/portraits/women/88.jpg' }
      ],
      status: 'Analyzed'
    },
    {
      id: '2',
      date: 'May 3, 2025',
      duration: '2h 15m',
      focusArea: 'Defense Fundamentals',
      players: [
        { id: '1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '3', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' }
      ],
      status: 'In Progress'
    },
    {
      id: '3',
      date: 'May 1, 2025',
      duration: '1h 30m',
      focusArea: 'Shooting Practice',
      players: [
        { id: '1', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '7', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
        { id: '8', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' }
      ],
      status: 'Analyzed'
    }
  ];

  return (
    <MainLayout title="Dashboard" showUploadButton={true}>
      <motion.div 
        className="grid grid-cols-12 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Performer Card */}
        <div className="col-span-12 md:col-span-6">
          <PerformerCard 
            name={topPerformer.name}
            image={topPerformer.image}
            rank={topPerformer.rank}
            stats={topPerformer.stats}
          />
        </div>

        {/* Most Successful Action */}
        <div className="col-span-12 md:col-span-6">
          <ActionCard 
            title={successfulAction.title}
            image={successfulAction.image}
            successRate={successfulAction.successRate}
          />
        </div>

        {/* Recent Practice Sessions */}
        <div className="col-span-12">
          <SessionTable sessions={sessions} />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default DashboardPage;