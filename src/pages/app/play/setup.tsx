import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';
import MainContainer from '../../../components/MainContainer/MainContiner'
import LittleButton from '../../../components/LittleButton/LittleButton'
import Header from '../../../components/Heading/Heading'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'
import Carousel from '../../../components/Carousel/Carousel';
import Button from '../../../components/Button/Button';

const Setup: NextPage = ({user}: {user: DefaultSession["user"]}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [deck, setDeck] = useState(null);

  return (
    <MainContainer title="SWGU | CHOOSE DECK" description="Choose your deck for this game" lineArt='single-center'>
      <LittleButton text="Back" position="top-left" imageDirection="right" onClick={() => router.back()} />
      <Header text='CHOOSE DECK' color='blue' textSize='3xl' />
      <ProfilePicture position='top-right' avatarName={session?.user?.name.split(' ')[0]} />
      <Carousel type='deck' position='center' />
      <Button link='/app/play' text='Play!' position='bottom' />
    </MainContainer>
  )
}

export default Setup