import React, { useState, useRef, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  showTime?: boolean;
  currentTime?: string;
  duration?: string;
}

export default function ProgressBar({ 
  value, 
  onChange, 
  className = '', 
  showTime = false,
  currentTime = '0:00',
  duration = '0:00'
}: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateProgress(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateProgress = (e: MouseEvent | React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, x / width));
      onChange(percentage);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={progressRef}
        className="h-1 bg-purple-700 rounded-full cursor-pointer relative group"
        onMouseDown={handleMouseDown}
      >
        <div 
          className="h-full bg-purple-400 rounded-full relative"
          style={{ width: `${value * 100}%` }}
        >
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg 
            transform scale-0 group-hover:scale-100 ${isDragging ? 'scale-100' : ''} 
            transition-transform duration-150`}
          />
        </div>
      </div>
      {showTime && (
        <div className="absolute -top-7 w-full flex justify-between text-sm text-purple-300">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      )}
    </div>
  );
}