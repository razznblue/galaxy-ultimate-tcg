import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DefaultSession } from 'next-auth';
import MainContainer from '../../../components/MainContainer/MainContiner'
import LittleButton from '../../../components/LittleButton/LittleButton'
import Header from '../../../components/Heading/Heading'
import Carousel from '../../../components/Carousel/Carousel';
import Button from '../../../components/Button/Button';
import BackgroundAudio from '../../../components/BackgroundAudio/BackgroundAudio';

const Setup: NextPage = ({user}: {user: DefaultSession["user"]}) => {
  const router = useRouter()
  const [deck, setDeck] = useState(null);

  return (
    <MainContainer title="SWGU | GAME SETUP" description="Choose your deck for this game" lineArt='single-center'>
      <BackgroundAudio styleClasses='absolute top-[3%] right-[3%]' />

      <LittleButton text="Back" position="top-left" imageDirection="right" onClick={() => router.back()} />
      <Header text='CHOOSE DECK' color='blue' textSize='3xl' />
      <Carousel type='deck' position='center' />
      <Button link='/app/play' text='Play!' position='bottom' />
    </MainContainer>
  )
}

export default Setup
