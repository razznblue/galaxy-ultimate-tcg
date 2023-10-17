import React, { createContext, useContext, useState } from 'react';
import { playBackgroundMusic, pauseBackgroundMusic } from '../util/sfx';

const AudioContext = createContext<any>(undefined as never);

export const AudioProvider = ({ children }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [playText, setPlayText] = useState('Play Audio');

    /* Toggle Audio */
    const toggleAudio = () => {
      if (audioPlaying) {
        pauseBackgroundMusic()
        setAudioPlaying(false);
        setPlayText('Play Audio');
      } else {
        playBackgroundMusic()
        setAudioPlaying(true);
        setPlayText('Pause Audio');
      }
    }

  return (
    <AudioContext.Provider value={{ audioPlaying, playText, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
