import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';

const TeamPage: React.FC = () => {
  return (
    <MainLayout title="Team" showUploadButton>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Team Page</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Go to Practice Session Page
        </button>
      </div>
    </MainLayout>
  );
};

export default TeamPage;