import React, { useState } from "react";
import SelectPicture from "../components/Select_Picture";
import PlayGame from "../components/Play_Game";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";

const Game = () => {
  const location = useLocation();
  const gamemode =
    (location.state as { gamemode: number })?.gamemode ?? 0;

  const [ready, setReady] = useState<boolean>(false);
  const [selectedPic, setSelectedPic] = useState<string | null>(null);

  function onClick() {
    setReady(true);
  }

  return (
    <div className="min-h-screen w-full 
                    bg-gradient-to-b from-purple-950 via-purple-900/20 to-black
                    flex flex-col items-center justify-center 
                    p-6 relative overflow-hidden">

      {/* Soft lighting background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-black/30 backdrop-blur-xl 
                   border border-purple-800/40 rounded-2xl 
                   shadow-[0_0_25px_rgba(120,40,255,0.25)]
                   p-6 relative z-10"
      >
        {!ready ? (
          <>
            <SelectPicture gamemode={gamemode} onSelect={setSelectedPic} />

            <button
              onClick={onClick}
              disabled={!selectedPic}
              className="mt-6 w-full py-3 text-lg font-medium
                         bg-purple-600 text-white rounded-xl shadow-lg
                         hover:bg-purple-700 transition
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Ready
            </button>
          </>
        ) : (
          <PlayGame pic={selectedPic ?? ""} />
        )}
      </motion.div>
    </div>
  );
};

export default Game;
