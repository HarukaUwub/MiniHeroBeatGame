"use client";
import { useState } from "react";
import StartScreen from "../components/StartScreen";
import Game from "../components/Game";
import ResultScreen from "../components/ResultScreen";

export default function App() {
  const [screen, setScreen] = useState<"start" | "game" | "result">("start");
  const [score, setScore] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      {screen === "start" && <StartScreen onStart={() => setScreen("game")} />}
      {screen === "game" && (
        <Game
          onEnd={(finalScore: number, acc: number) => {
            setScore(finalScore);
            setAccuracy(acc);
            setScreen("result");
          }}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          score={score}
          accuracy={accuracy}
          onRestart={() => setScreen("start")}
        />
      )}
    </div>
  );
}
