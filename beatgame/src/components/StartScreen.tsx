import { Song } from '../types/song';
import SongSelector from './SongSelector';

type Props = { 
  onStart: (selectedSong: Song) => void;
  songs: Song[];
};

export default function StartScreen({ onStart, songs }: Props) {
  return (
    <div className="text-center space-y-8 animate-slide-in">
      {/* Main title with gradient text */}
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          MiniHero Beat
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Subtitle and instructions */}
      <div className="space-y-6 max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl text-gray-300 font-light">
          ¡Siente el ritmo y demuestra tu destreza!
        </p>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Cómo jugar:</h3>
          <div className="space-y-2 text-gray-300">
            <p>🎵 Las notas caerán desde arriba siguiendo el ritmo</p>
            <p>⌨️ Presiona las teclas <span className="font-bold text-yellow-400">A, S, D, F</span> cuando las notas lleguen a la zona de golpe</p>
            <p>🎯 ¡Mantén el ritmo para obtener la máxima puntuación!</p>
            <p>🎶 Cada canción tiene su propio patrón y dificultad</p>
          </div>
        </div>
      </div>

      {/* Key visualization */}
      <div className="flex justify-center space-x-4 mb-8">
        {['A', 'S', 'D', 'F'].map((key, index) => (
          <div 
            key={key}
            className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-2xl font-bold text-white border-2 border-gray-600 shadow-lg hover:scale-110 transition-transform duration-200"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {key}
          </div>
        ))}
      </div>

      {/* Song Selection */}
      <SongSelector 
        songs={songs}
        selectedSong={null}
        onSongSelect={onStart}
        onStart={() => {}}
      />

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-8">
        Desarrollado con ❤️ para los amantes del ritmo
      </p>
    </div>
  );
}
