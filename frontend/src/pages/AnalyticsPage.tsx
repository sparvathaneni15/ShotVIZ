import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import QueryBuilder from '../components/analytics/QueryBuilder';
import KpiCard from '../components/analytics/KpiCard';
import VideoClip from '../components/analytics/VideoClip';
import { motion } from 'framer-motion';

interface QueryFormData {
  player: string;
  actionType: string;
  dateRange: string;
}

const AnalyticsPage: React.FC = () => {
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const handleGenerateReport = (formData: QueryFormData) => {
    // In a real app, you would fetch data based on the query
    setIsReportGenerated(true);
  };

  const handlePlayVideo = (id: string) => {
    // In a real app, this would open the video player
    console.log(`Playing video ${id}`);
  };

  return (
    <MainLayout title="Performance Analytics">
      {/* Query Builder */}
      <QueryBuilder onGenerateReport={handleGenerateReport} />

      {isReportGenerated && (
        <>
          {/* KPI Cards */}
          <motion.section 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <KpiCard
              title="Most Used Action"
              value="3PT Shot"
              subtitle="42% of all actions"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              delay={0.1}
            />
            
            <KpiCard
              title="Top Performer"
              value="John Doe"
              subtitle="87% success rate"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              delay={0.2}
            />
            
            <KpiCard
              title="Total Actions"
              value="1,247"
              subtitle="Last 30 days"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              delay={0.3}
            />
          </motion.section>

          {/* Charts and Video Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Charts Section */}
            <motion.section 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Performance Analytics</h2>
              <div className="h-[300px] mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
                {/* In a real app, you would render an actual chart here */}
              </div>
              <div className="h-[300px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
                {/* In a real app, you would render an actual chart here */}
              </div>
            </motion.section>

            {/* Video Playlist Section */}
            <motion.section 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Related Clips</h2>
              <div className="space-y-4">
                <VideoClip
                  title="3PT Shot - Q1 2:45"
                  date="vs Stanford - Jan 15, 2025"
                  onClick={() => handlePlayVideo('1')}
                  delay={0.6}
                />
                <VideoClip
                  title="Fast Break - Q2 8:12"
                  date="vs UCLA - Jan 12, 2025"
                  onClick={() => handlePlayVideo('2')}
                  delay={0.7}
                />
                <VideoClip
                  title="Pick and Roll - Q3 5:30"
                  date="vs USC - Jan 8, 2025"
                  onClick={() => handlePlayVideo('3')}
                  delay={0.8}
                />
                <VideoClip
                  title="Zone Defense - Q4 3:15"
                  date="vs Arizona - Dec 28, 2024"
                  onClick={() => handlePlayVideo('4')}
                  delay={0.9}
                />
              </div>
            </motion.section>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default AnalyticsPage;