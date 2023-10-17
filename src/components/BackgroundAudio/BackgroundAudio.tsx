import { useAudio } from "../../context/AudioContext";

const BackgroundAudio: any = ({styleClasses}) => {
  const { audioPlaying, toggleAudio } = useAudio();
  return (
      <div
      className={`${styleClasses}`}
      onClick={toggleAudio}
      style={{maxWidth: '40px'}}
    >
      <img
        src={audioPlaying ? "/icons/pause-btn.png" : "/icons/play-btn.png"}
        alt="Audio Toggle"
      />
    </div>
  )
}
  
export default BackgroundAudio
