"use client";
import { useState } from "react";
import StartScreen from "../components/StartScreen";
import Game from "../components/Game";
import ResultScreen from "../components/ResultScreen";
import { Song } from "../types/song";
import { songs } from "../data/songs";

export default function App() {
  const [screen, setScreen] = useState<"start" | "game" | "result">("start");
  const [score, setScore] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleStart = (song: Song) => {
    setSelectedSong(song);
    setScreen("game");
  };

  const handleEnd = (finalScore: number, acc: number) => {
    setScore(finalScore);
    setAccuracy(acc);
    setScreen("result");
  };

  const handleRestart = () => {
    setSelectedSong(null);
    setScreen("start");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-pulse"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-32 w-12 h-12 bg-pink-500/10 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="animate-fade-in">
          {screen === "start" && <StartScreen onStart={handleStart} songs={songs} />}
          {screen === "game" && selectedSong && (
            <Game
              song={selectedSong}
              onEnd={handleEnd}
            />
          )}
          {screen === "result" && (
            <ResultScreen
              score={score}
              accuracy={accuracy}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
}
