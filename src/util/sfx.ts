import { Howl } from 'howler';
import { assetServiceUrl } from './constants';

const sounds = {
  BG: `${assetServiceUrl}/AUDIO/background/Notorious_BIG_Big_Poppa.mp3`,
  POP: `${assetServiceUrl}/AUDIO/sfx/pop.wav`,
  GLASS_WOOSH: `${assetServiceUrl}/AUDIO/sfx/glass-woosh.wav`,
  ERROR: `${assetServiceUrl}/AUDIO/sfx/error.wav`
}

const SFX = {
  background: new Howl({
    src: [sounds.BG],
    html5: true,
    loop: true,
    volume: 0.5
  }),
  pop: new Howl({
    src: [sounds.POP],
    html5: true,
    volume: 1,
    onend: () => { SFX.pop.unload(); }
  }),
  glassWoosh: new Howl({
    src: [sounds.GLASS_WOOSH],
    html5: true,
    onend: () => { SFX.glassWoosh.unload(); }
  }),
  error: new Howl({
    src: [sounds.ERROR],
    html5: true,
    volume: 0.3,
    onend: () => { SFX.error.unload(); }
  })
}

/* Background Music Exports */
export const playBackgroundMusic = () => SFX.background.play()
export const pauseBackgroundMusic = () => SFX.background.pause()

/* Sound Effect Exports */
export const playButtonClick = () => SFX.pop.play()
export const playSecondarySound = () => SFX.glassWoosh.play()
export const playError = () => SFX.error.play()
