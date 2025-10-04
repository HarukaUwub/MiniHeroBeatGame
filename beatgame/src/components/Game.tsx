"use client";

import { useEffect, useRef, useState } from "react";
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

  const hitsRef = useRef(0);
  const totalRef = useRef(0);
  const scoreRef = useRef(0); // ✅ Nueva ref para score

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio("../songs/song1.mp3");
    let stillMounted = true;
    let endTimeout: ReturnType<typeof setTimeout>;
    let noteInterval: ReturnType<typeof setInterval>;

    audio.play()
      .then(() => {
        if (!stillMounted) {
          audio.pause();
          return;
        }

        noteInterval = setInterval(() => {
          const key = keys[Math.floor(Math.random() * keys.length)];
          setNotes(prev => [...prev, { key, y: 0, id: Date.now() }]);

          setTotal(t => {
            const newTotal = t + 1;
            totalRef.current = newTotal;
            return newTotal;
          });
        }, 1500);

        endTimeout = setTimeout(() => {
          clearInterval(noteInterval);
          const accuracy = totalRef.current > 0
            ? Math.round((hitsRef.current / totalRef.current) * 100)
            : 0;
          onEnd(scoreRef.current, accuracy); // ✅ usar scoreRef
        }, 100000);
      })
      .catch(() => {
        console.warn("Audio playback was blocked by the browser.");
      });

    const moveInterval = setInterval(() => {
      setNotes(prev =>
        prev.map(note => ({ ...note, y: note.y + 10 })).filter(n => n.y < 500)
      );
    }, 100);

    return () => {
      stillMounted = false;
      audio.pause();
      clearInterval(moveInterval);
      clearInterval(noteInterval);
      clearTimeout(endTimeout);
    };
  }, []); // ✅ solo al montar

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const noteIndex = notes.findIndex(
        n => n.key === e.key && n.y > 400 && n.y < 480
      );
      if (noteIndex !== -1) {
        setScore(s => {
          const newScore = s + 100;
          scoreRef.current = newScore; // ✅ actualiza ref
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
     <div>
    <div className="relative w-[450px] h-[500px] bg-purple-900 border-4 border-white">
      <div className="static flex justify-around w-full text-xl ">
        {keys.map(k => (
          <div key={k} className="relative w-1/4 h-[495px] border-l-4 border-r-4 border-white">
            <p className="absolute bottom-0 justify-around  text-center">{k.toUpperCase()}</p>
          </div>
          
        ))}
      </div>

      {notes.map(note => (
        <Note key={note.id} y={note.y} lane={keys.indexOf(note.key)} />
      ))}

      
    </div>
    <div className="absolute top-2 left-50 text-lg">Puntos: {score}</div>
      <div className="absolute top-2 left-4 text-lg">Aciertos: {hits}</div>
    </div>
      
  );
}
