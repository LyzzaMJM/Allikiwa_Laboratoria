import React, { useEffect, useState } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  isRecording?: boolean;
  currentTime?: number;
  duration?: number;
  color?: string;
  barCount?: number;
  onSeek?: (ratio: number) => void;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isPlaying,
  isRecording = false,
  currentTime = 0,
  duration = 100,
  color = '#2a3691',
  barCount = 36,
  onSeek
}) => {
  // Generate pseudo-random bar heights with acoustic patterns
  const [staticBars] = useState<number[]>(() => {
    return Array.from({ length: barCount }, (_, i) => {
      // Natural cadence wave shape
      const sinPart = Math.sin((i / barCount) * Math.PI);
      const randomNoise = 0.25 + Math.random() * 0.75;
      return Math.min(1, Math.max(0.18, sinPart * randomNoise));
    });
  });

  const [activeAmplitudes, setActiveAmplitudes] = useState<number[]>(staticBars);

  useEffect(() => {
    if (!isPlaying && !isRecording) {
      setActiveAmplitudes(staticBars);
      return;
    }

    const interval = setInterval(() => {
      setActiveAmplitudes((prev) =>
        prev.map((val) => {
          const delta = (Math.random() - 0.5) * 0.4;
          return Math.max(0.15, Math.min(1.0, val + delta));
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isRecording, staticBars]);

  const progressRatio = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const currentActiveIndex = Math.floor(progressRatio * barCount);

  return (
    <div 
      className="flex items-center gap-[2.5px] sm:gap-[3px] h-14 w-full cursor-pointer select-none px-2 py-1 rounded-xl bg-[#fff8f6]/70 border border-[#ede8df]"
      onClick={(e) => {
        if (!onSeek) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        onSeek(ratio);
      }}
      title="Haz clic para avanzar el audio"
    >
      {activeAmplitudes.map((height, i) => {
        const isPast = i <= currentActiveIndex;
        const barHeightPercent = isRecording 
          ? Math.max(20, height * 100) 
          : isPlaying 
            ? Math.max(16, (isPast ? height : staticBars[i] * 0.75) * 100)
            : Math.max(16, staticBars[i] * 60);

        return (
          <div
            key={i}
            className="flex-1 rounded-full transition-all duration-100 ease-out"
            style={{
              height: `${barHeightPercent}%`,
              backgroundColor: isRecording
                ? '#ba1a1a' // Recording red
                : isPast
                  ? color
                  : '#c6c5d4',
              opacity: isPast || isRecording ? 1 : 0.45,
              transform: isPlaying && i === currentActiveIndex ? 'scaleY(1.15)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};
