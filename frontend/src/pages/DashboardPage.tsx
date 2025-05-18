import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PerformerCard from '../components/dashboard/PerformerCard';
import ActionCard from '../components/dashboard/ActionCard';
import SessionTable from '../components/dashboard/SessionTable';
import { motion } from 'framer-motion';
import { i } from 'framer-motion/client';

const DashboardPage: React.FC = () => {

  const [sessions, setSessions] = useState<[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/practice_sessions/`); // adjust to your FastAPI route
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <MainLayout title='Dashboard' showUploadButton>
      <div className="flex">
          <SessionTable practiceSessions={sessions} />
      </div>
      <div className="flex">
      </div> 
    </MainLayout>
  );
};

export default DashboardPage;