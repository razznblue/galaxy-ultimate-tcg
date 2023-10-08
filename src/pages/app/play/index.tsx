import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../../components/MainContainer/MainContiner'
import LittleButton from '../../../components/LittleButton/LittleButton'
import Header from '../../../components/Heading/Heading'

const GameScreen: NextPage = () => {
  return (
    <MainContainer title="SWGU | PLAY SCREEN" description="It's game time!" lineArt='none'>
    <h1>Play Game Page</h1>
  </MainContainer>
  )
}

const PreGame: NextPage = () => {
  const router = useRouter()
  const [deck, setDeck] = useState(null);

  return (
    <MainContainer title="SWGU | CHOOSE DECK" description="Choose your deck for this game" lineArt='single-center'>
      <LittleButton text="Back" position="top-left" imageDirection="right" onClick={() => router.back()} />
      <Header text='CHOOSE DECK' color='blue' />
    </MainContainer>
  )
}

export default PreGame