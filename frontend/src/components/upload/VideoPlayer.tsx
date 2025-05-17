// components/VideoPlayer.tsx
import React from 'react';

const VideoPlayer: React.FC<{ filename: string }> = ({ filename }) => {
  return (
    <video controls width="600">
      <source src={`http://localhost:8000/videos/${filename}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;