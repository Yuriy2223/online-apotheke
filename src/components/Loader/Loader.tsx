"use client";

import { clsx } from "clsx";

const sweepStyle = {
  WebkitMaskImage:
    "linear-gradient(120deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)",
  maskImage:
    "linear-gradient(120deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)",
  WebkitMaskSize: "260% 100%",
  maskSize: "260% 100%",
  WebkitMaskPosition: "180% 0%",
  maskPosition: "180% 0%",
  animation: "sweep 6s linear infinite",
};

const dotFadeKeyframes = `
@keyframes dotFade {
  0%, 20% { opacity: 0; }
  30%, 50% { opacity: 1; }
  60%, 100% { opacity: 0; }
}
@keyframes sweep {
  0% {
    mask-position: 180% 0%;
    -webkit-mask-position: 180% 0%;
  }
  100% {
    mask-position: -80% 0%;
    -webkit-mask-position: -80% 0%;
  }
}
`;

export const Loader = () => (
  <>
    <style>{dotFadeKeyframes}</style>

    <div className="h-screen w-screen bg-green-500/25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div
          className={clsx(
            "relative flex items-center text-[22px] font-semibold text-green-800"
          )}
          style={sweepStyle}
        >
          Loading
          <span className="inline-flex ml-2 gap-2">
            {[0, 0.3, 0.6].map((delay, i) => (
              <span
                key={i}
                className="text-green-800 text-[26px]"
                style={{
                  animation: "dotFade 1.5s ease-in-out infinite",
                  animationDelay: `${delay}s`,
                }}
              >
                .
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  </>
);
