import Image from "next/image";
import { assetServiceUrl } from "../../util/constants";

const Location: any = ({ location }) => {

  const unrevealedLocation = `${assetServiceUrl}/IMAGES/locations/location-unrevealed.webp`;
  const locationImg = location?.type === 'unrevealed' ? unrevealedLocation : location?.img
  const locationText = location?.text

  const player1ScoreColor = location?.player1Score > location?.player2Score ? 'text-green-500' : 'text-red-500';
  const player2ScoreColor = location?.player2Score > location?.player1Score ? 'text-green-500' : 'text-red-500';

  return (
    <div className="relative flex text-center align-center justify-center"> 
      <Image className="text-center align-center justify-center" src={locationImg} width="100" height="100" alt="" /> 
      <p className='absolute top-1/2 text-[8px]'>{locationText}</p>
      <p className={`absolute top-0 right-1/2 transform translate-x-1/2 text-center text-2xl ${player2ScoreColor}`}>{location?.player2Score}</p>
      <p className={`absolute bottom-0 right-1/2 transform translate-x-1/2 text-center text-2xl ${player1ScoreColor}`}>{location?.player1Score}</p>
    </div>
  )
}

export default Location