import React, { createContext, useContext, useState } from 'react';
import SFX from '../util/sfx';

const AudioContext = createContext<any>(undefined as never);

export const AudioProvider = ({ children }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [playText, setPlayText] = useState('Play Audio');

    /* Toggle Audio */
    const toggleAudio = () => {
        if (playText !== 'Pausing...') {
            if (audioPlaying) {
                const fadeOutTime = 2000;
                SFX.background.fade(1, 0, fadeOutTime);
                setPlayText('Pausing...');
                setTimeout(() => {
                    SFX.background.pause();
                    setAudioPlaying(false);
                    setPlayText('Play Audio');
                }, fadeOutTime)
            } else {
                SFX.background.fade(0, 1, 100);
                SFX.background.play();
                setAudioPlaying(true);
                setPlayText('Pause Audio');
            }
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
