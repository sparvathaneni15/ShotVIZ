import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import VideoPlayer from '../components/tagging/VideoPlayer';
import TagFlow from '../components/tagging/TagFlow';
import TagTimeline from '../components/tagging/TagTimeline';
import ActionMenu from '../components/tagging/ActionMenu';
import PlayerRoleMenu from '../components/tagging/PlayerRoleMenu';
import ResultMenu from '../components/tagging/ResultMenu';
import axios from 'axios';

interface Tag {
  color: string;
  label: string;
}

// Payload interface for submitting tag action results
interface TagActionResultPayload {
  practice_sessions_id: number;
  start_time: number;
  end_time: number;
  action_id: number;
  result_id: number;
  shot_id?: number;
  occurred_at: string;
}

interface TimelineItem {
  id: string;
  timestamp: string;
  tags: Tag[];
}

const VideoTaggingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState(1);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isPlayerRoleMenuOpen, setIsPlayerRoleMenuOpen] = useState(false);

  // State to hold the tag payload temporarily
  const [tagPayload, setTagPayload] = useState<Partial<TagActionResultPayload>>({});


  const handleAddTag = () => {
    setIsActionMenuOpen(true);
  };

  const handleSelectAction = (action: { id: string; name: string }) => {
    setIsActionMenuOpen(false);
    setIsPlayerRoleMenuOpen(true);
  };
    // Function to submit the tag payload to the backend
  const submitTag = async () => {
    try {
      const response = await axios.post('http://localhost:8000/tag_action_result/', tagPayload);
      console.log('Tag submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting tag:', error);
    }
  };


  const handleAssignRole = (playerId: string, roleId: string) => {
    // In a real app, you would update the state with the new role assignment
    console.log(`Assigned role ${roleId} to player ${playerId}`);
    // Placeholder: Trigger tag submission after assigning roles
    submitTag();
  };



  const handleEditTag = (id: string) => {
    // In a real app, this would open the tag editing modal
    console.log(`Editing tag ${id}`);
  };

  return (
    <MainLayout title="Video Tagging">
      <VideoPlayer 
        videoSrc="https://images.pexels.com/photos/3755442/pexels-photo-3755442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        onAddTag={handleAddTag}
      />

      <TagFlow activeStep={activeStep} />

      <ActionMenu
        isOpen={isActionMenuOpen}
        onClose={() => setIsActionMenuOpen(false)}
        onSelectAction={handleSelectAction}
      />

      <PlayerRoleMenu
        isOpen={isPlayerRoleMenuOpen}
        onClose={() => setIsPlayerRoleMenuOpen(false)}
        onAssignRole={handleAssignRole}
        onOpenResultMenu={() => console.log('Result menu opened')}
      />

      <ResultMenu
      />
    </MainLayout>
  );
};

export default VideoTaggingPage;