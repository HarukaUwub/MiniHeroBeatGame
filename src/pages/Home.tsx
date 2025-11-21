import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Camera, Users } from "lucide-react"; // íconos modernos
import temp from "../Images/pose.jpg";

export default function Home() {
  const [gmode, setGmode] = useState(0);
  const [tmode, setTmode] = useState("Pose");

  function handleClick() {
    const newMode = gmode === 0 ? 100 : 0;
    setGmode(newMode);
    setTmode(newMode === 0 ? "Pose" : "Imagen");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-4 bg-gradient-to-b from-purple-950 to-black padding-8">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold text-white drop-shadow-xl"
      >
        TITLE
      </motion.h1>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl shadow-2xl overflow-hidden"
      >
        <img
          src={temp}
          alt=""
          className="w-[680px] h-[480px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="text-purple-300 text-lg">Modo de juego:</div>

        <p className="text-2xl font-semibold text-white">{tmode}</p>

        {/* Slider bonito */}
        <div className="flex items-center gap-6">
          <Users className="w-7 h-7 text-purple-300" />

          <div
            onClick={handleClick}
            className="w-44 h-8 bg-purple-950/40 rounded-full relative cursor-pointer shadow-inner"
          >
            <motion.div
              animate={{ x: gmode === 0 ? 0 : 140 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute top-1 left-1 w-6 h-6 bg-purple-400 rounded-full shadow-lg"
            />
          </div>

          <Camera className="w-7 h-7 text-purple-300" />
        </div>

        {/* Button */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link
          to="/Game"
          state={{ gamemode: gmode }}
          className="mt-4 bg-purple-600 hover:bg-purple-700 
                     text-white px-8 py-3 rounded-xl 
                     shadow-xl transition-all duration-200"
        >
          Start Game
        </Link>
        <Link
          to="/HowItWorks"
          state={{ gamemode: gmode }}
          className="mt-4 bg-purple-600 hover:bg-purple-700 
                     text-white px-8 py-3 rounded-xl 
                     shadow-xl transition-all duration-200"
        >
          How It Works
        </Link>
        </div>
      </motion.div>
      
    </div>
  );
}
