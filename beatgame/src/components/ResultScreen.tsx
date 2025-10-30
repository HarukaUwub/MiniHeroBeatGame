type Props = {
  score: number;
  accuracy: number;
  onRestart: () => void;
};

export default function ResultScreen({ score, accuracy, onRestart }: Props) {
  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy >= 90) return { message: "¡INCREÍBLE!", color: "text-yellow-400", emoji: "🏆" };
    if (accuracy >= 80) return { message: "¡EXCELENTE!", color: "text-green-400", emoji: "🎉" };
    if (accuracy >= 70) return { message: "¡MUY BIEN!", color: "text-blue-400", emoji: "👏" };
    if (accuracy >= 60) return { message: "¡BIEN!", color: "text-purple-400", emoji: "👍" };
    return { message: "¡SIGUE PRACTICANDO!", color: "text-orange-400", emoji: "💪" };
  };

  const performance = getPerformanceMessage(accuracy);

  return (
    <div className="text-center space-y-8 animate-bounce-in">
      {/* Performance header */}
      <div className="space-y-4">
        <div className="text-6xl animate-bounce">{performance.emoji}</div>
        <h2 className={`text-4xl md:text-5xl font-bold ${performance.color} animate-pulse`}>
          {performance.message}
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Results card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl max-w-md mx-auto">
        <h3 className="text-2xl font-semibold text-gray-300 mb-6">Resultados</h3>
        
        <div className="space-y-6">
          {/* Score */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-500/30">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎯</div>
              <span className="text-lg text-gray-300">Puntaje</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{score.toLocaleString()}</div>
          </div>

          {/* Accuracy */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl border border-green-500/30">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎵</div>
              <span className="text-lg text-gray-300">Precisión</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
          </div>

          {/* Accuracy bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Precisión</span>
              <span>{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-2xl font-bold text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10">🔄 JUGAR DE NUEVO</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        </button>
        
        <p className="text-sm text-gray-500">
          ¡Gracias por jugar MiniHero Beat! 🎮
        </p>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center space-x-4 mt-8">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-pink-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
