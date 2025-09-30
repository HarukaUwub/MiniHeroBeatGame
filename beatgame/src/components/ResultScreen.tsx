type Props = {
  score: number;
  accuracy: number;
  onRestart: () => void;
};

export default function ResultScreen({ score, accuracy, onRestart }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Resultados</h2>
      <p className="text-xl">Puntaje: {score}</p>
      <p className="text-xl mb-6">Precisión: {accuracy}%</p>
      <button
        onClick={onRestart}
        className="bg-green-500 px-6 py-3 rounded-2xl text-xl hover:bg-green-600"
      >
        Volver al menú
      </button>
    </div>
  );
}
