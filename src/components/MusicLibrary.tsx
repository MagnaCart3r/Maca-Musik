import React from 'react';
import { ArrowLeft, Play, Clock, Search } from 'lucide-react';
import AppHeader from './AppHeader';
import { songs } from '../data/songs';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface MusicLibraryProps {
  onBackClick: () => void;
}

export default function MusicLibrary({ onBackClick }: MusicLibraryProps) {
  const { currentSong, playSong } = useAudioPlayer();

  const recentlyPlayed = [
    { id: 1, title: 'Midnight Serenade', artist: 'Cosmic Dreams', playedAt: '2 mins ago' },
    { id: 2, title: 'Purple Rain', artist: 'The Weekend', playedAt: '15 mins ago' },
    { id: 3, title: 'Starlight', artist: 'Luna Eclipse', playedAt: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 text-white">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBackClick}
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back to Player</span>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search songs..."
              className="bg-purple-800/50 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-purple-300" />
          </div>
        </div>

        {/* Library Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* All Songs */}
          <div className="bg-purple-800/20 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Library</h2>
            <div className="space-y-4">
              {songs.map((song) => (
                <div 
                  key={song.id} 
                  className={`flex items-center justify-between p-3 rounded-lg hover:bg-purple-700/30 transition-colors group
                    ${currentSong.id === song.id ? 'bg-purple-700/40' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => playSong(song)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play size={18} />
                    </button>
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-purple-300">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-sm text-purple-300">{song.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Played */}
          <div className="bg-purple-800/20 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock size={20} />
              Recently Played
            </h2>
            <div className="space-y-4">
              {recentlyPlayed.map((song) => (
                <div key={song.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-700/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={18} />
                    </button>
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-purple-300">{song.artist}</p>
                    </div>
                  </div>
                  <span className="text-sm text-purple-300">{song.playedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}