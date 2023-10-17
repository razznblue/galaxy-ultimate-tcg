import Image from "next/image";

const Card: any = ({ card, cardOptions }) => {

  const cardImg = card?.image;
  const cardName = card?.name;
  const cardText = card?.abilityText;
  const level = cardOptions?.level || '0';

  return (
    <div className="relative flex text-center align-center justify-center max-w-[50px]"> 
      <Image className="text-center align-center justify-center" src={cardImg} width="100" height="100" alt="" /> 
      <p className='absolute bottom-[5%] text-[8px]'>{cardName}</p>
      {/* <p className='absolute top-1/2 text-[8px]'>{cardText}</p> */}
      {/* <p className={`absolute top-0 right-1/2 transform translate-x-1/2 text-center text-2xl ${player2ScoreColor}`}>{location?.player2Score}</p> */}
      {/* <p className={`absolute bottom-0 right-1/2 transform translate-x-1/2 text-center text-2xl ${player1ScoreColor}`}>{location?.player1Score}</p> */}
    </div>
  )
}

export default Card