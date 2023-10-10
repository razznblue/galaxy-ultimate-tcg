import Image from "next/image";
import Header from "../Heading/Heading";
import { useEffect, useState } from "react";

const Carousel: any = ({ type, cardStyle, size, position }) => {
  const [activeDeckName, setActiveDeckName] = useState('');

  useEffect(() => {
    setActiveDeckName('RepublicGeos');
  }, [])

  const toggleBtn = "https://swgu-library.onrender.com/images/ICONS/triangle-btn.webp";
  const deck1 = "https://swgu-library.onrender.com/images/CARD_BACKS/ahsoka-lightsaber.webp";
  const deck2 = "https://swgu-library.onrender.com/images/CARD_BACKS/swgu-base.webp";

  return (
    <div className={`flex flex-row absolute top-[25%] w-[100%] items-center justify-evenly`}>
      <div id="prevBtn">
        <Image src={toggleBtn} alt='previous' height='50' width='50' />
      </div>
      <div id="items" className="flex flex-row items-center justify-evenly w-[65%]">
        <div className="item mx-2"><Image src={deck1} alt='previous' height='70' width='70' /></div>
        <div className="item mx-2"><Image src={deck1} alt='previous' height='70' width='70' /></div>
        <div className="item selected mx-2"><Image src={deck2} alt='previous' height='110' width='110' /></div>
        <div className="item mx-2"><Image src={deck1} alt='previous' height='70' width='70' /></div>
        <div className="item mx-2"><Image src={deck2} alt='previous' height='70' width='70' /></div>
      </div>
      <div id="nextBtn">
        <Image src={toggleBtn} alt='next' height='50' width='50' className='transform rotate-180' />
      </div>
      <Header text={activeDeckName} textSize='sm' styles='absolute bottom-[-25%]' />
    </div>
  )
}

export default Carousel