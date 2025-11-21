import { useRef, useEffect, useState } from "react";
import p5 from "p5";
import ml5 from "ml5";
import poseImage from "../Images/pose.jpg";

// ---------------------------
// Tipos mínimos para ml5
// ---------------------------
type Keypoint = {
  x: number;
  y: number;
  confidence: number;
  name?: string;
};

type PoseResult = {
  keypoints: Keypoint[];
};

type BodyPoseModel = {
  model: any | null;
  detect: (input: any, cb: (result: PoseResult[]) => void) => void;
  detectStart: (input: any, cb: (result: PoseResult[]) => void) => void;
  getSkeleton: () => number[][];
};

export default function HowItWorks() {
  const sketchRef = useRef<HTMLDivElement | null>(null);
  const myP5Ref = useRef<any | null>(null);

  const [matched, setMatched] = useState(false);

  useEffect(() => {
    let video: any;
    let bodyPose: BodyPoseModel | null = null;
    let poses: PoseResult[] = [];
    let referenceKeypoints: Keypoint[] = [];
    let connections: number[][] = [];

    // ---------------------------
    // Función comparadora (dummy)
    // ---------------------------
 
    // ---------------------------
    // Cargar imagen y obtener pose de referencia
    // ---------------------------
    const image = new Image();
    image.src = poseImage;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const tempPose: BodyPoseModel = ml5.bodyPose("MoveNet", () => {
        tempPose.detect(canvas, (results: PoseResult[]) => {
          if (results.length > 0) {
            referenceKeypoints = results[0].keypoints;
            (tempPose as any).model?.dispose?.();

            setupLiveSketch();
          }
        });
      });
    };

    // ---------------------------
    // Crear sketch p5
    // ---------------------------
    const setupLiveSketch = () => {
      if (myP5Ref.current) {
        myP5Ref.current.remove();
        myP5Ref.current = null;
      }

      const sketch = (p: any) => {
        p.setup = () => {
          p.createCanvas(640, 480);

          video = p.createCapture(p.VIDEO);
          video.size(640, 480);
          video.hide();

          bodyPose = ml5.bodyPose("MoveNet");

          // Esperar a que cargue el modelo
          const wait = setInterval(() => {
            if (bodyPose?.model) {
              clearInterval(wait);

              bodyPose?.detectStart(video.elt, (r: PoseResult[]) => {
                poses = r;
              });

              connections = bodyPose?.getSkeleton() ?? [];
            }
          }, 80);
        };

        p.draw = () => {
          p.image(video, 0, 0, p.width, p.height);

          poses.forEach((pose) => {
            // Líneas del esqueleto
            connections.forEach(([a, b]) => {
              const pA = pose.keypoints[a];
              const pB = pose.keypoints[b];

              if (pA?.confidence > 0.1 && pB?.confidence > 0.1) {
                p.stroke(255, 0, 0);
                p.line(pA.x, pA.y, pB.x, pB.y);
              }
            });

            // Keypoints
            pose.keypoints.forEach((kp) => {
              if (kp.confidence > 0.1) {
                p.fill(0, 255, 0);
                p.noStroke();
                p.circle(kp.x, kp.y, 10);
              }
            });
          });
        };
      };

      if (sketchRef.current) {
        myP5Ref.current = new p5(sketch, sketchRef.current);
      }
    };

    // ---------------------------
    // Limpieza
    // ---------------------------
    return () => {
      if (myP5Ref.current) {
        myP5Ref.current.remove();
        myP5Ref.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center px-6 margin-10">
      <div className="bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          ¿Cómo funciona el modelo?
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Esta demo usa <span className="text-purple-400">MoveNet</span> +
          <span className="text-purple-400"> ml5.js</span> para detectar tu
          esqueleto en tiempo real.
        </p>

        {/* Sketch */}
        <div className="flex justify-center">
          <div
            ref={sketchRef}
            className="rounded-xl overflow-hidden border border-gray-700 shadow-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}
