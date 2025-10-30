"use client";

import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import { Song } from '../types/song';
import { SongNoteGenerator, NotePattern } from '../utils/noteGenerator';

interface NoteData {
  key: string;
  y: number;
  id: number;
  type: 'normal' | 'hold' | 'rapid';
}

type Props = {
  song: Song;
  onEnd: (finalScore: number, accuracy: number) => void;
};

const keys = ["a", "s", "d", "f"];

export default function Game({ song, onEnd }: Props) {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [hits, setHits] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const hitsRef = useRef(0);
  const totalRef = useRef(0);
  const scoreRef = useRef(0);
  const noteGeneratorRef = useRef<SongNoteGenerator | null>(null);
  const gameTimeRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize note generator
    noteGeneratorRef.current = new SongNoteGenerator(song);
    const noteGenerator = noteGeneratorRef.current;
    
    const audio = new Audio(song.file);
    let stillMounted = true;
    let endTimeout: ReturnType<typeof setTimeout>;
    let gameTimeInterval: ReturnType<typeof setInterval>;

    const startTime = Date.now();
    setGameStartTime(startTime);

    audio.play()
      .then(() => {
        if (!stillMounted) {
          audio.pause();
          return;
        }

        // Start game time tracking
        gameTimeInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          gameTimeRef.current = elapsed;
          setCurrentTime(elapsed);
        }, 50); // Update every 50ms for smooth animation

        // End game after song duration
        endTimeout = setTimeout(() => {
          clearInterval(gameTimeInterval);
          const accuracy = totalRef.current > 0
            ? Math.round((hitsRef.current / totalRef.current) * 100)
            : 0;
          onEnd(scoreRef.current, accuracy);
        }, song.duration * 1000);
      })
      .catch(() => {
        console.warn("Audio playback was blocked by the browser.");
      });

    // Generate notes based on song pattern
    const noteGenerationInterval = setInterval(() => {
      if (!noteGenerator) return;
      
      const currentGameTime = gameTimeRef.current;
      const upcomingNotes = noteGenerator.getNotesForTimeRange(
        currentGameTime,
        currentGameTime + 2000 // Look ahead 2 seconds
      );

      upcomingNotes.forEach(notePattern => {
        if (notePattern.timing <= currentGameTime + 100) { // Small buffer
          const key = keys[notePattern.lane];
          setNotes(prev => [...prev, { 
            key, 
            y: 0, 
            id: Date.now() + Math.random(),
            type: notePattern.type
          }]);

          setTotal(t => {
            const newTotal = t + 1;
            totalRef.current = newTotal;
            return newTotal;
          });
        }
      });
    }, 100);

    // Move notes down
    const moveInterval = setInterval(() => {
      setNotes(prev =>
        prev.map(note => ({ ...note, y: note.y + 10 })).filter(n => n.y < 500)
      );
    }, 100);

    return () => {
      stillMounted = false;
      audio.pause();
      clearInterval(moveInterval);
      clearInterval(noteGenerationInterval);
      clearInterval(gameTimeInterval);
      clearTimeout(endTimeout);
    };
  }, [song]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const noteIndex = notes.findIndex(
        n => n.key === e.key && n.y > 400 && n.y < 480
      );
      if (noteIndex !== -1) {
        setScore(s => {
          const newScore = s + 100;
          scoreRef.current = newScore;
          return newScore;
        });

        setHits(h => {
          const newHits = h + 1;
          hitsRef.current = newHits;
          return newHits;
        });

        setNotes(prev => prev.filter((_, i) => i !== noteIndex));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [notes]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Song info and score display */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
        {/* Song info */}
        <div className="text-center mb-4 pb-4 border-b border-gray-600/50">
          <h3 className="text-xl font-bold text-white">{song.name}</h3>
          <p className="text-gray-400">{song.artist} • {song.bpm} BPM</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm">
            <span className={`px-2 py-1 rounded-full ${
              song.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
              song.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {song.difficulty === 'easy' ? 'Fácil' : song.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
            <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
              {Math.floor(currentTime / 1000)}s / {song.duration}s
            </span>
          </div>
        </div>

        {/* Score display */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{score}</div>
              <div className="text-sm text-gray-400">Puntos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{hits}</div>
              <div className="text-sm text-gray-400">Aciertos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{total}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
          
          {/* Accuracy indicator */}
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-400">
              {total > 0 ? Math.round((hits / total) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-400">Precisión</div>
          </div>
        </div>
      </div>

      {/* Game area */}
      <div className="relative mx-auto">
        <div className="relative w-[450px] h-[500px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl border-4 border-gray-600 shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
          
          {/* Lane separators */}
          <div className="absolute flex justify-around w-full h-full">
            {keys.map((k, index) => (
              <div 
                key={k} 
                className="relative w-1/4 h-full border-l-2 border-r-2 border-gray-600/50"
              >
                {/* Hit zone indicator */}
                <div className="absolute bottom-20 left-0 right-0 h-2 bg-gradient-to-r from-red-500/30 to-pink-500/30 animate-pulse-glow"></div>
                
                {/* Key label */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-xl font-bold text-white border-2 border-gray-600 shadow-lg">
                  {k.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {notes.map(note => (
            <Note key={note.id} y={note.y} lane={keys.indexOf(note.key)} type={note.type} />
          ))}

          {/* Hit zone visual feedback */}
          <div className="absolute bottom-20 left-0 right-0 h-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-400 text-sm">
        Presiona las teclas <span className="font-bold text-yellow-400">A, S, D, F</span> cuando las notas lleguen a la zona roja
      </div>
    </div>
  );
}
