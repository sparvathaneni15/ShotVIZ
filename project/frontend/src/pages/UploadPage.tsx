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

  const handleFormSubmit = (formData: FormData) => {
    // Simulate upload process
    setUploading(true);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Reset form after "upload" completes
          setUploading(false);
          setSelectedFiles(null);
          setProgress(0);
        }, 1000);
      }
    }, 300);
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