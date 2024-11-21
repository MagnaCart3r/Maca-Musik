import React, { useState } from 'react';
import MusicPlayer from './components/MusicPlayer';
import MusicLibrary from './components/MusicLibrary';

function App() {
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="min-h-screen bg-purple-950">
      {showLibrary ? (
        <MusicLibrary onBackClick={() => setShowLibrary(false)} />
      ) : (
        <MusicPlayer onLibraryClick={() => setShowLibrary(true)} />
      )}
    </div>
  );
}

export default App;