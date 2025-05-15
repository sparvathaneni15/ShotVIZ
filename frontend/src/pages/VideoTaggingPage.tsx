import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import VideoPlayer from '../components/tagging/VideoPlayer';
import TagFlow from '../components/tagging/TagFlow';
import TagTimeline from '../components/tagging/TagTimeline';
import ActionMenu from '../components/tagging/ActionMenu';
import Action from '../components/tagging/ActionMenu';
import PlayerRoleMenu from '../components/tagging/PlayerRoleMenu';
import axios from 'axios';

interface Tag {
  color: string;
  label: string;
}

interface TimelineItem {
  id: string;
  timestamp: string;
  tags: Tag[];
}

interface Player {
  id: string;
  name: string;
  avatar: string;
}

interface Role {
  id: string;
  label: string;
}

const VideoTaggingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState(1);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isPlayerRoleMenuOpen, setIsPlayerRoleMenuOpen] = useState(false);
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<Player[]>('http://localhost:8000/players/all');
        setPlayers(response.data);
      } catch (error) {
        console.error('Failed to fetch players:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchPlayers();
    fetchRoles();
  }, []);
  
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
    setIsActionMenuOpen(true);
  };

  const handleSelectAction = (action: { id: string; name: string }) => {
    setIsActionMenuOpen(false);
    setIsPlayerRoleMenuOpen(true);
  };

  const handleAssignRole = (playerId: string, roleId: string) => {
    // In a real app, you would update the state with the new role assignment
    console.log(`Assigned role ${roleId} to player ${playerId}`);
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

      <TagTimeline 
        items={timelineItems}
        onEdit={handleEditTag}
      />

      <ActionMenu
        isOpen={isActionMenuOpen}
        onClose={() => setIsActionMenuOpen(false)}
        onSelectAction={handleSelectAction}
      />

      <PlayerRoleMenu
        isOpen={isPlayerRoleMenuOpen}
        onClose={() => setIsPlayerRoleMenuOpen(false)}
        players={players}
        roles={roles}
        onAssignRole={handleAssignRole}
      />
    </MainLayout>
  );
};

export default VideoTaggingPage;