// AudioPlayer.tsx
import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
    src: string;
  isPlaying?: boolean;
  volume?: number;
    loop?: boolean;
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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.play().catch(error => console.error('Audio playback failed:', error));
    }
  }, []);

  return (
    <audio ref={audioRef}>
      <source src="https://cryptskii.github.io/AWESOME.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
