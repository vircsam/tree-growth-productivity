import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const AmbientSounds = () => {
  const { isMuted, soundVolume } = useStore();
  const audioRef = useRef(null);

  // Strictly using local audio as requested
  const localTrack = "/lofi-music.mp3";

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isMuted && audioRef.current.paused) {
        console.log("Attempting to play local audio...");
        audioRef.current.play()
          .then(() => console.log("Local audio playing successfully"))
          .catch(err => {
            if (err.name !== 'AbortError') {
              console.error("Local audio play failed:", err);
            }
          });
      }
    };

    const handleInteraction = () => {
      playAudio();
      window.removeEventListener('mousedown', handleInteraction);
    };

    window.addEventListener('mousedown', handleInteraction);
    return () => window.removeEventListener('mousedown', handleInteraction);
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume;
      if (isMuted) {
        audioRef.current.pause();
      } else if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, soundVolume]);

  useEffect(() => {
    if (audioRef.current && audioRef.current.src !== window.location.origin + localTrack) {
        audioRef.current.src = localTrack;
        audioRef.current.load();
        if (!isMuted) {
          audioRef.current.play().catch(() => {});
        }
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
      onWaiting={() => console.log("Buffering local audio...")}
      onError={(e) => console.error("Local Audio Error (check if lofi-music.mp3 exists in public/):", e)}
    />
  );
};

export default AmbientSounds;
