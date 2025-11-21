// src/model/Compare.tsx  (si tu archivo se llama Compare o PoseMatcher, reemplaza el contenido)
// Este componente usa ml5 para detectar pose y comparar con referencePose.
import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import { motion } from "motion/react";

interface Keypoint {
  x: number;
  y: number;
  confidence: number;
}

interface PoseMatcherProps {
  referenceImage: string;
  referencePose: Keypoint[];
}

const PoseMatcher: React.FC<PoseMatcherProps> = ({ referenceImage, referencePose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (!referencePose?.length) return;

    let bodyPose: any;
    let req: number;

    const norm = (pts: Keypoint[]) => {
      const A = pts[5];
      const B = pts[6];
      if (!A || !B) return pts;
      const d = Math.hypot(A.x - B.x, A.y - B.y) || 1;
      return pts.map((p) => ({ ...p, x: p.x / d, y: p.y / d }));
    };

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const vid = videoRef.current!;
      vid.srcObject = stream;
      await new Promise((r) => (vid.onloadedmetadata = () => vid.play().then(r)));
      bodyPose = ml5.bodyPose("MoveNet", () => loop());
    };

    const loop = () => {
      const vid = videoRef.current;
      if (!vid || !bodyPose) return;

      bodyPose.detect(vid, (res: any[]) => {
        if (res.length > 0 && referencePose.length > 0) {
          const live = norm(res[0].keypoints);
          const ref = norm(referencePose);

          let total = 0;
          let count = 0;
          for (let i = 0; i < ref.length; i++) {
            if (live[i] && ref[i].confidence > 0.5) {
              total += Math.hypot(live[i].x - ref[i].x, live[i].y - ref[i].y);
              count++;
            }
          }

          setMatched(count > 0 && total / count < 0.4);
        }
        req = requestAnimationFrame(loop);
      });
    };

    start();

    return () => {
      cancelAnimationFrame(req);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, [referencePose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.36 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-sm border border-purple-800/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Your Camera</h3>
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-purple-800/20">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
          </div>
          <p className={`mt-4 text-center font-bold ${matched ? "text-green-400" : "text-red-400"}`}>
            {matched ? "✔ Pose matched!" : "Matching..."}
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-purple-800/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Reference Pose</h3>
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-purple-800/20">
            <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
          </div>
          <p className="mt-4 text-center text-gray-300">Match this pose</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PoseMatcher;
