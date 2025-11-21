import { useRef, useEffect, useState } from "react";
import p5 from "p5";
import ml5 from "ml5";

export function DetectPhoto(photo: string) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [poses, setPoses] = useState<any[]>([]);

  useEffect(() => {
    if (!photo) return;

    let myP5: p5 | null = null;

    const sketch = (p: any) => {
      p.setup = async () => {
        p.createCanvas(0, 0);
        const img = await p.loadImage(photo);
        p.image(img, 0, 0);

        const bodyPose = ml5.bodyPose("MoveNet", async () => {
          console.log("✅ Pose model loaded");

          try {
            const detected = await bodyPose.detect(img.canvas);
            console.log("Poses detected", detected[0]?.keypoints);
            setPoses(detected[0]?.keypoints || []);
          } catch (err) {
            console.error("❌ Detection error:", err);
          }
        });
      };
    };

    myP5 = new p5(sketch, sketchRef.current!);

    return () => {
      if (myP5) {
        myP5.remove();
        myP5 = null;
      }
    };
  }, [photo]);

  return poses; // 🔥 solo regresa el array
}
