import { Howl } from 'howler';

const sounds = {
  BG: "https://swgu-library.onrender.com/audio/AUDIO/Notorious_BIG_Big_Poppa.mp3",
  POP: "https://swgu-library.onrender.com/audio/AUDIO/pop.wav",
  GLASS_WOOSH: "https://swgu-library.onrender.com/audio/AUDIO/glass-woosh.wav",
  ERROR: "https://swgu-library.onrender.com/audio/AUDIO/error.wav"
}

const SFX = {
  background: new Howl({
    src: [sounds.BG],
    html5: true,
    loop: true,
    volume: 0.5,
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

export default SFX
