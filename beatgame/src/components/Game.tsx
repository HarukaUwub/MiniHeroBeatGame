"use client";

import { useEffect, useState } from "react";
import Note from "./Note";

interface NoteData {
  key: string;
  y: number;
  id: number;
}

type Props = {
  onEnd: (finalScore: number, accuracy: number) => void;
};

const keys = ["a", "s", "d", "f"];

export default function Game({ onEnd }: Props) {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [hits, setHits] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio("/songs/song1.mp3");
    let stillMounted = true;        // <- flag to check if component is alive
    let endTimeout: ReturnType<typeof setTimeout>;
    let noteInterval: ReturnType<typeof setInterval>;

    // --- start playback and generate notes once playback begins ---
    audio.play()
      .then(() => {
        if (!stillMounted) {
          audio.pause();
          return;
        }

        // generate notes every 1.5s once playback is confirmed
        noteInterval = setInterval(() => {
          const key = keys[Math.floor(Math.random() * keys.length)];
          setNotes(prev => [...prev, { key, y: 0, id: Date.now() }]);
          setTotal(t => t + 1);
        }, 1500);

        // end game after 30s of playback
        endTimeout = setTimeout(() => {
          clearInterval(noteInterval);
          const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;
          onEnd(score, accuracy);
        }, 30000);
      })
      .catch(() => {
        // if autoplay is blocked, user will need to interact first
        console.warn("Audio playback was blocked by the browser.");
      });

    // move notes downward
    const moveInterval = setInterval(() => {
      setNotes(prev =>
        prev.map(note => ({ ...note, y: note.y + 10 })).filter(n => n.y < 500)
      );
    }, 100);

    // clean-up
    return () => {
      stillMounted = false;
      audio.pause();               // safe even if play() never resolved
      clearInterval(moveInterval);
      clearInterval(noteInterval);
      clearTimeout(endTimeout);
    };
  }, [hits, total, score, onEnd]);

  // keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const noteIndex = notes.findIndex(
        n => n.key === e.key && n.y > 400 && n.y < 480
      );
      if (noteIndex !== -1) {
        setScore(s => s + 100);
        setHits(h => h + 1);
        setNotes(prev => prev.filter((_, i) => i !== noteIndex));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [notes]);

  return (
    <div className="relative w-[400px] h-[500px] bg-gray-900 border-4 border-white">
      {/* Lanes */}
      <div className="absolute bottom-0 flex justify-around w-full text-xl">
        {keys.map(k => (
          <div key={k} className="w-1/4 text-center">{k.toUpperCase()}</div>
        ))}
      </div>

      {/* Notes */}
      {notes.map(note => (
        <Note key={note.id} y={note.y} lane={keys.indexOf(note.key)} />
      ))}

      {/* Score */}
      <div className="absolute top-2 right-4 text-lg">Puntos: {score}</div>
    </div>
  );
}
