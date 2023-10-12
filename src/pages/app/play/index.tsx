import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MainContainer from '../../../components/MainContainer/MainContiner'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'
import Location from '../../../components/Location/Location'

const GameScreen: NextPage = () => {
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [location3, setLocation3] = useState(null);

  useEffect(() => {
    setLocation3({
      type: 'unrevealed',
      text: 'Will be revealed at the beginning of turn 3',
      player1Score: 0,
      player2Score: 0
    })
    setLocation2({
      type: 'revealed',
      img: 'https://swgu-library.onrender.com/images/LOCATIONS/location-kamino.webp',
      text: 'When you play a card here, add a copy to another location',
      player1Score: 12,
      player2Score: 3
    })
    setLocation1({
      type: 'revealed',
      img: 'https://swgu-library.onrender.com/images/LOCATIONS/location-mandalore.webp',
      text: 'Instant abilities happen twice here',
      player1Score: 0,
      player2Score: 0
    })
  }, [])

  return (
    <MainContainer title="SWGU | PLAY SCREEN" description="It's game time!" lineArt='none'>
      <div id="gameContainer" className="grid gap-4 grid-cols-3 grid-rows-3">
        <div id="player2">
          <ProfilePicture />
          <div className="hand">
            <div className="dynamic-card"></div>
          </div>
          <div id="retreat-btn"></div>
        </div>

        <div id="game-board">
          <div id="column1">
            <div className="player2cards"></div>
            <Location location={location1} />
            <div className="player1cards"></div>
          </div>
          <div id="column2">
            <div className="player2cards"></div>
            <Location location={location2} />
            <div className="player1cards"></div>
          </div>
          <div id="column3">
            <div className="player2cards"></div>
            <Location location={location3} />
            <div className="player1cards"></div>
          </div>
        </div>

        <div id="player1">
          <ProfilePicture />
          <div className="hand">
            <div className="dynamic-card"></div>
          </div>
          <div id="energy-marker"><p>4</p></div>
          <div id="retreat-btn"></div>
        </div>
      </div>
    </MainContainer>
  )
}

export default GameScreen