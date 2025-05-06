import React from 'react';
import { Shield, Mail, Lock, Moon, Sun, Home, Video, BarChart2, Users, Upload, Check, Play, ArrowRight, ChevronDown } from 'lucide-react';

interface IconProps {
  className?: string;
}

// Re-export Lucide icons with default props
export const ShieldIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Shield size={24} />
  </div>
);

export const EnvelopeIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Mail size={24} />
  </div>
);

export const LockIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Lock size={24} />
  </div>
);

export const HomeIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Home size={24} />
  </div>
);

export const VideoIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Video size={24} />
  </div>
);

export const ChartIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <BarChart2 size={24} />
  </div>
);

export const UsersIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Users size={24} />
  </div>
);

export const UploadIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Upload size={24} />
  </div>
);

export const CheckIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Check size={24} />
  </div>
);

export const PlayIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <Play size={24} />
  </div>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <ArrowRight size={24} />
  </div>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = '' }) => (
  <div className={className}>
    <ChevronDown size={24} />
  </div>
);

// Export Lucide components directly
export { Moon, Sun };