import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import VideoPlayer from '../components/tagging/VideoPlayer';
import TagFlow from '../components/tagging/TagFlow';
import TagTimeline from '../components/tagging/TagTimeline';

interface Tag {
  color: string;
  label: string;
}

interface TimelineItem {
  id: string;
  timestamp: string;
  tags: Tag[];
}

const VideoTaggingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState(1);
  
  // Mock timeline data
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: '1',
      timestamp: '00:45',
      tags: [
        { color: 'bg-[#2D3092]/20 text-[#2D3092]', label: 'Offense' },
        { color: 'bg-[#FFB81C]/20 text-[#FFB81C]', label: '3-Point Shot' },
        { color: 'bg-green-500/20 text-green-500', label: 'Made' }
      ]
    },
    {
      id: '2',
      timestamp: '01:15',
      tags: [
        { color: 'bg-[#2D3092]/20 text-[#2D3092]', label: 'Defense' },
        { color: 'bg-[#FFB81C]/20 text-[#FFB81C]', label: 'Block' }
      ]
    }
  ]);

  const handleAddTag = () => {
    // In a real app, this would open a tag creation modal
    // For demo purposes, we'll just advance the step
    setActiveStep(activeStep < 3 ? activeStep + 1 : 1);
  };

  const handleEditTag = (id: string) => {
    // In a real app, this would open a tag editing modal
    console.log(`Editing tag ${id}`);
  };

  return (
    <MainLayout title="Video Tagging">
      {/* Video Player Section */}
      <VideoPlayer 
        videoSrc="https://images.pexels.com/photos/3755442/pexels-photo-3755442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        onAddTag={handleAddTag}
      />

      {/* Tag Flowchart */}
      <TagFlow activeStep={activeStep} />

      {/* Timeline */}
      <TagTimeline 
        items={timelineItems}
        onEdit={handleEditTag}
      />
    </MainLayout>
  );
};

export default VideoTaggingPage;