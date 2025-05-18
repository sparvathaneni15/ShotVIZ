import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import UploadZone from '../components/upload/UploadZone';
import UploadForm from '../components/upload/UploadForm';
import { motion } from 'framer-motion';



const UploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(files);
  };

  const handleFormSubmit = async (formValues: { date: string; sessionType: string; tags: string; notes: string }) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    try {
      // Step 1: Upload the video file
      const videoData = new FormData();
      videoData.append('file', selectedFiles[0]);

      const videoUploadRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload_video`, {
        method: 'POST',
        body: videoData,
      });

      if (!videoUploadRes.ok) {
        throw new Error('Video upload failed');
      }

      const videoUploadResult = await videoUploadRes.json();
      const videoUrl = videoUploadResult.video_url;


      const metadata = {
        uploaded_by: 1, // Hardcoded user ID for now
        session_date: formValues.date,
        video_url: videoUrl,
        notes: formValues.notes,
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/practice_sessions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        throw new Error('Session creation failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setSelectedFiles(null);
      setProgress(0);
    }
  };

  const handleCancel = () => {
    setSelectedFiles(null);
    setUploading(false);
    setProgress(0);
  };

  return (
    <MainLayout title="Upload Practice Film">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <UploadZone onFilesSelected={handleFilesSelected} />
        
        <UploadForm 
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          showProgress={uploading}
          progressPercentage={progress}
          fileName={selectedFiles?.[0]?.name || 'video.mp4'}
        />
      </motion.div>
    </MainLayout>
  );
};

export default UploadPage;
