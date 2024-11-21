import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, List, Clock, Heart, Shuffle, Repeat, VolumeX } from 'lucide-react';
import ProgressBar from './ProgressBar';
import AppHeader from './AppHeader';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface MusicPlayerProps {
  onLibraryClick: () => void;
}

export default function MusicPlayer({ onLibraryClick }: MusicPlayerProps) {
  const {
    audioRef,
    currentSong,
    isPlaying,
    progress,
    volume,
    currentTime,
    duration,
    formatTime,
    togglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleProgressChange,
    handleVolumeChange,
    playNextSong,
    playPreviousSong
  } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 text-white">
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <AppHeader />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Cover Art */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl mb-8 relative group">
          <img
            src={currentSong.coverUrl}
            alt={`${currentSong.title} Cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-purple-300">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-4">
          <ProgressBar
            value={progress}
            onChange={handleProgressChange}
            showTime
            currentTime={formatTime(currentTime)}
            duration={formatTime(duration)}
          />
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-8 mb-8">
          <button 
            onClick={playPreviousSong}
            className="text-purple-300 hover:text-white transition-colors"
          >
            <SkipBack size={24} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-purple-500 hover:bg-purple-400 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause size={28} fill="white" />
            ) : (
              <Play size={28} fill="white" />
            )}
          </button>
          <button 
            onClick={playNextSong}
            className="text-purple-300 hover:text-white transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4 w-full max-w-xs mb-8">
          <button 
            onClick={() => handleVolumeChange(volume === 0 ? 0.7 : 0)}
            className="text-purple-300 hover:text-white transition-colors"
          >
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <ProgressBar
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1"
          />
        </div>

        {/* Additional Controls */}
        <div className="flex gap-6">
          <button 
            onClick={onLibraryClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors"
          >
            <List size={18} />
            <span>Library</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors">
            <Clock size={18} />
            <span>History</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors">
            <Heart size={18} />
            <span>Favorites</span>
          </button>
        </div>
      </div>
    </div>
  );
}