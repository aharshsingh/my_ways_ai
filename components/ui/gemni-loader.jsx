"use client";
import React, { useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GemniLoader({handleStartInterview}) {
  const progress = useMotionValue(0.13);
  const smoothProgress = useSpring(progress, {
    stiffness: 0.5,  // ultra low stiffness
    damping: 0.1,    // very low damping
    mass: 20,        // very heavy mass
  });

  const pathLengthFirst = useTransform(smoothProgress, [0, 1], [0.2, 1.2]);
  const pathLengthSecond = useTransform(smoothProgress, [0, 1], [0.15, 1.2]);
  const pathLengthThird = useTransform(smoothProgress, [0, 1], [0.1, 1.2]);
  const pathLengthFourth = useTransform(smoothProgress, [0, 1], [0.05, 1.2]);
  const pathLengthFifth = useTransform(smoothProgress, [0, 1], [0, 1.2]);

  useEffect(() => {
    progress.set(1);
  }, [progress]);

  return (
    <div className=" flex items-center justify-center bg-black w-full rounded-md relative">
      <GoogleGeminiEffect handleStartInterview={handleStartInterview}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
