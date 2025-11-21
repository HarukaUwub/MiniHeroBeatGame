// src/components/PlayGame.tsx
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { DetectPhoto } from "../model/Detect_Photo";
import Compare from "../model/Compare";

const cardBase = "bg-black/40 backdrop-blur-sm border border-purple-800/30 rounded-xl shadow-lg p-6";

const PlayGame = ({ pic }: { pic: string }) => {
  const poses = DetectPhoto(pic);

  useEffect(() => {
    // debug
    console.log("Playing with poses:", poses);
  }, [poses]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }} className="max-w-5xl mx-auto py-10 space-y-8 w-full px-4">
      

      <div className={`${cardBase}`}>
        <h1 className="text-2xl font-semibold text-white text-center mb-4">Camera</h1>
        <Compare referenceImage={pic} referencePose={poses} />
      </div>
    </motion.div>
  );
};

export default PlayGame;
