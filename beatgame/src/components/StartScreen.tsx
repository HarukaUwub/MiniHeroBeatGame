type Props = { onStart: () => void };

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">MiniHero Rhythm</h1>
      <p className="text-xl fort-bold mb-6">Presiona las teclas A,S,D,F en el momento exacto</p>
      <button
        onClick={onStart}
        className="bg-green-500 px-6 py-3 rounded-2xl text-xl hover:bg-green-600"
      >
        Jugar
      </button>
    </div>
  );
}
