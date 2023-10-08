import Image from "next/image";

const DeckCarousel: any = ({ cardStyle, displayAmount, position }) => {

  const toggleBtn = "https://swgu-library.onrender.com/images/ICONS/triangle-btn.webp";
  const deck1 = "https://swgu-library.onrender.com/images/CARD_BACKS/ahsoka-lightsaber.webp";
  const deck2 = "https://swgu-library.onrender.com/images/CARD_BACKS/swgu-base.webp";

  return (
    <div className={`flex flex-row absolute top-[30%] w-[100%] items-center justify-evenly`}>
      <div id="prevBtn">
        <Image src={toggleBtn} alt='previous' height='50' width='50' />
      </div>
      <div id="decks" className="flex flex-row items-center justify-evenly w-[50%]">
        <div className="deck-back mx-2"><Image src={deck1} alt='previous' height='70' width='70' /></div>
        <div className="deck-back mx-2"><Image src={deck1} alt='previous' height='70' width='70' /></div>
        <div className="deck-back selected mx-2"><Image src={deck2} alt='previous' height='120' width='120' /></div>
        <div className="deck-back mx-2"><Image src={deck1} alt='previous' height='70' width='70' /></div>
        <div className="deck-back mx-2"><Image src={deck2} alt='previous' height='70' width='70' /></div>
      </div>
      <div id="nextBtn">
        <Image src={toggleBtn} alt='next' height='50' width='50' className='transform rotate-180' />
      </div>
    </div>
  )
}

export default DeckCarousel