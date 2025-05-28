import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import VideoPlayer from '../components/tagging/VideoPlayer';
import StatsTable from '../components/tagging/StatsTable';
import ActionTagForm from '../components/tagging/ActionTagForm';
import axios from 'axios';


const VideoTaggingPage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'stats' | 'tags'>('stats');
  const location = useLocation();


  // State for sessionDate
  const [sessionDate, setSessionDate] = useState<string | undefined>(undefined);
  const [video_url, setVideoUrl] = useState<string>('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log("Fetching session with ID:", id);
        const response = await axios.get(`http://localhost:8000/practice_sessions/${id}`);
        console.log("Fetched session data:", response.data);
        const date = new Date(response.data.session_date);
        const video_url = response.data.video_url;
        setVideoUrl(video_url);
        setSessionDate(date.toLocaleDateString());
      } catch (error) {
        console.error('Error fetching practice session:', error);
      }
    };

    if (id) {
      fetchSession();
    }
  }, [id]);

  return (
    <MainLayout title="Video Tagging">
      <VideoPlayer 
        videoSrc={video_url} 
      />

      <div className="flex w-full">
        <button
          onClick={() => setActiveTab('stats')}
          className={`w-1/2 px-4 py-2 text-center ${
            activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          Stats Table
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`w-1/2 px-4 py-2 text-center ${
            activeTab === 'tags' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          Action Tag Form
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'stats' && id ? <StatsTable practiceSessionId={Number(id)} /> : <ActionTagForm />}
      </div>
    </MainLayout>
  );
};

export default VideoTaggingPage;