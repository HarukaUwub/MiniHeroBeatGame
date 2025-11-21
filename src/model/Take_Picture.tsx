// src/model/Take_Picture.tsx  (si tu archivo original se llama Take_Picture.tsx reemplaza su contenido)
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export default function TakePicture({ onConfirm }: { onConfirm: (pic: string) => void; }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (mounted && videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((e) => console.error("camera error:", e));
    return () => {
      mounted = false;
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const vid = videoRef.current;
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    c.width = vid.videoWidth || 640;
    c.height = vid.videoHeight || 480;
    ctx.drawImage(vid, 0, 0, c.width, c.height);
    const data = c.toDataURL("image/png");
    setPreview(data);
  };

  const confirm = () => {
    if (preview) onConfirm(preview);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col items-center gap-4">
      {!preview ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-64 rounded-lg shadow border border-purple-800/20 bg-black/40"
            style={{ transform: "scaleX(-1)" }}
          />
          <button onClick={takePhoto} className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition">
            Take Photo
          </button>
        </>
      ) : (
        <>
          <img src={preview} alt="preview" className="w-64 rounded-lg shadow" />
          <div className="flex gap-3">
            <button onClick={confirm} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">Confirm</button>
            <button onClick={() => setPreview(null)} className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">Retake</button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}
