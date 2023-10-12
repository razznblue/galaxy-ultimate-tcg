import Image from "next/image";

const Location: any = ({ location }) => {

  const unrevealedLocation = 'https://swgu-library.onrender.com/images/LOCATIONS/location-unrevealed.webp';
  const locationImg = location?.type === 'unrevealed' ? unrevealedLocation : location?.img
  const locationText = location?.text

  const player1ScoreColor = location?.player1Score > location?.player2Score ? 'text-green-500' : 'text-red-500';
  const player2ScoreColor = location?.player2Score > location?.player1Score ? 'text-green-500' : 'text-red-500';

  return (
    <div className="relative"> 
      <Image src={locationImg} width="100" height="100" alt="" /> 
      <p className='absolute bottom-[5%] text-xs'>{locationText}</p>
      <p className={`absolute top-0 right-1/2 transform -translate-x-1/2 ${player2ScoreColor}`}>{location?.player2Score}</p>
      <p className={`absolute bottom-0 right-1/2 transform -translate-x-1/2 ${player1ScoreColor}`}>{location?.player1Score}</p>
    </div>
  )
}

export default Location