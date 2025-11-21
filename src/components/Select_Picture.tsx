// src/components/SelectPicture.tsx
import React from "react";
import { motion } from "motion/react";
import TakePicture from "../model/Take_Picture";
import Pose1 from "../Images/pose.jpg";
import Pose2 from "../Images/pose2.jpg";
import Pose3 from "../Images/pose3.jpg";
import Pose4 from "../Images/pose4.jpg";
import Pose5 from "../Images/pose5.jpg";
import Pose6 from "../Images/pose6.jpg";

export default function SelectPicture({
  gamemode,
  onSelect,
}: {
  gamemode: number;
  onSelect: (pic: string) => void;
}) {
  // Card container style (clean version of Home look)
  const cardBase =
    "bg-black/40 backdrop-blur-sm border border-purple-800/30 rounded-xl shadow-lg p-6";

  if (gamemode === 100) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className="w-full flex justify-center p-6"
      >
        <div className={`${cardBase} max-w-4xl w-full space-y-6`}>
          <h1 className="text-3xl font-semibold text-white text-center">
            Select Image
          </h1>

          <div className="grid grid-cols-3 gap-4">
            {[Pose1, Pose2, Pose3, Pose4, Pose5, Pose6].map((pose, i) => (
              <motion.img
                key={i}
                src={pose}
                alt={`Pose ${i + 1}`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="aspect-square object-cover rounded-lg border border-purple-800/20 cursor-pointer shadow-sm"
                onClick={() => onSelect(pose)}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-300">Upload your own image</p>
            <input
              type="file"
              accept="image/*"
              className="bg-black/30 text-gray-200 px-3 py-2 rounded-lg border border-purple-800/20 cursor-pointer"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  onSelect(url);
                }
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // camera mode
  if (gamemode === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className="w-full flex justify-center p-6"
      >
        <div className={`${cardBase} max-w-xl w-full text-center space-y-5`}>
          <h1 className="text-3xl font-semibold text-white">Take a Picture</h1>
          <p className="text-gray-300">Match the pose 😄</p>

          <TakePicture onConfirm={onSelect} />
        </div>
      </motion.div>
    );
  }

  return null;
}
