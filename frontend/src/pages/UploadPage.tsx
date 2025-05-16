import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import UploadZone from '../components/upload/UploadZone';
import UploadForm from '../components/upload/UploadForm';
import { motion } from 'framer-motion';

interface FormData {
  date: string;
  sessionType: string;
  tags: string;
  notes: string;
}

const UploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(files);
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    const data = new FormData();
    data.append('file', selectedFiles[0]);
    data.append('date', formData.date);
    data.append('sessionType', formData.sessionType);
    data.append('tags', formData.tags);
    data.append('notes', formData.notes);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Optional: handle server response if needed
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