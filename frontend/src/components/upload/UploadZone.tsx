import React, { useState, useRef, DragEvent } from 'react';
import { UploadIcon } from '../icons/Icons';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  onFilesSelected: (files: FileList) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const names = Array.from(e.dataTransfer.files).map((file) => file.name);
      setSelectedFileNames(names);
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((file) => file.name);
      setSelectedFileNames(names);
      onFilesSelected(e.target.files);
    }
  };

  return (
    <motion.div 
      className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 mb-6 border-2 border-dashed transition-all duration-200 ${
        isDragging ? 'border-[#FFB81C]' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      </div>
      
      {/* Upload Content */}
      <div className="relative z-10 text-center py-12">
        <UploadIcon className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Drag and drop your video files here
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">or</p>
        
        <motion.button 
          onClick={handleBrowseClick}
          className="bg-[#2D3092] hover:bg-[#2D3092]/90 text-white px-6 py-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse Files
        </motion.button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          accept="video/mp4,video/mov"
          multiple
        />
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Supported formats: MP4, MOV (max 4GB)
        </p>
        {selectedFileNames.length > 0 && (
          <div className="mt-6">
            <p className="text-green-600 dark:text-green-400 font-medium">File(s) selected:</p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {selectedFileNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UploadZone;