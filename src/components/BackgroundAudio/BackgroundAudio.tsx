import { useAudio } from "../../context/AudioContext";

const BackgroundAudio: any = ({styleClasses}) => {
  const { audioPlaying, playText, toggleAudio } = useAudio();
  
  return (
      <div className={`${styleClasses}`} style={{color: '#FFF'}} onClick={toggleAudio}>{playText}</div>
  )
}
  
export default BackgroundAudio
