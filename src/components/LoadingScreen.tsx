import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 25 + 10;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => onComplete(), 900);
      }
      setProgress(Math.min(current, 100));
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9998] bg-neutral-50 flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="w-35 h-35 rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Loading"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.innerHTML =
                '<span class="text-white text-xl font-bold">GM</span>';
            }}
          />
        </div>

        <div className="w-48 h-0.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-800 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-neutral-400 tracking-widest uppercase font-medium">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
