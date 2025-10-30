import { Song } from '../types/song';

interface SongSelectorProps {
  songs: Song[];
  selectedSong: Song | null;
  onSongSelect: (song: Song) => void;
  onStart: () => void;
}

export default function SongSelector({ songs, selectedSong, onSongSelect, onStart }: SongSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Selecciona una Canción
        </h2>
        <p className="text-xl text-gray-300">Elige tu ritmo favorito y demuestra tu habilidad</p>
      </div>

      {/* Songs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => onSongSelect(song)}
            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedSong?.id === song.id
                ? 'border-blue-500 bg-blue-500/20 shadow-blue-500/25'
                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
            }`}
          >
            {/* Song info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {song.name}
                </h3>
                <p className="text-gray-400">{song.artist}</p>
              </div>

              <p className="text-sm text-gray-300">{song.description}</p>

              {/* Song stats */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">BPM:</span>
                  <span className="text-yellow-400 font-semibold">{song.bpm}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Duración:</span>
                  <span className="text-purple-400 font-semibold">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Difficulty badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(song.difficulty)}`}>
                {getDifficultyText(song.difficulty)}
              </div>
            </div>

            {/* Selection indicator */}
            {selectedSong?.id === song.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Start button */}
      {selectedSong && (
        <div className="text-center animate-bounce-in">
          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-2xl font-bold text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">🎵 ¡JUGAR {selectedSong.name.toUpperCase()}!</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          </button>
        </div>
      )}
    </div>
  );
}

