// AudioPlayer.tsx
import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  isPlaying?: boolean;
  volume?: number;
  onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying = true, volume = 1, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error('Audio playback failed:', error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && onEnded) {
      audio.addEventListener('ended', onEnded);
      return () => {
        audio.removeEventListener('ended', onEnded);
      };
    }
  }, [onEnded]);

  return (
    <audio ref={audioRef}>
      <source src="/assets/AWESOME.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
