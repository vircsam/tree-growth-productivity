import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const AmbientSounds = () => {
  const { isMuted, isNight, soundVolume, audioMode } = useStore();
  const audioRef = useRef(null);

  // High-quality Pixabay/Standard sound URLs
  const dayTrack = "https://cdn.pixabay.com/audio/2022/01/18/audio_d1c1a63c62.mp3"; 
  const rainTrack = "https://cdn.pixabay.com/audio/2021/09/06/audio_80608670f3.mp3"; 
  const musicTrack = "/lofi--music.mp3"; // Fixed as per user feedback

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isMuted && audioRef.current.paused) {
        console.log("Attempting to play audio...");
        audioRef.current.play()
          .then(() => console.log("Audio playing successfully"))
          .catch(err => {
            if (err.name !== 'AbortError') {
              console.error("Audio play failed:", err);
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
  }, [isMuted, audioMode, isNight]);

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
    if (audioRef.current) {
      const targetSrc = audioMode === 'lofi' ? musicTrack : (isNight ? rainTrack : dayTrack);
      if (audioRef.current.src !== targetSrc) {
        console.log("Loading source:", targetSrc);
        audioRef.current.src = targetSrc;
        audioRef.current.load();
        
        if (!isMuted) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
             playPromise.catch(() => {});
          }
        }
      }
    }
  }, [isNight, audioMode, isMuted]);

  return (
    <audio
      ref={audioRef}
      loop
      crossOrigin="anonymous"
      preload="auto"
      style={{ display: 'none' }}
      onWaiting={() => console.log("Buffering...")}
      onError={(e) => console.error("Audio Error:", e)}
    />
  );
};

export default AmbientSounds;
