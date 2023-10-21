import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MainContainer from '../../../components/MainContainer/MainContiner'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'
import Location from '../../../components/Location/Location'
import Card from '../../../components/Card/Card'
import { assetServiceUrl } from '../../../util/constants'

const GameScreen: NextPage = () => {
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [location3, setLocation3] = useState(null);

  const [card, setCard] = useState(null);
  const [cardOptions, setCardOptions] = useState(null);

  useEffect(() => {
    setLocation3({
      type: 'unrevealed',
      text: 'Will be revealed at the beginning of turn 3',
      player1Score: 0,
      player2Score: 0
    })
    setLocation2({
      type: 'revealed',
      img: `${assetServiceUrl}/IMAGES/locations/location-kamino.webp`,
      text: 'When you play a card here, add a copy to another location',
      player1Score: 12,
      player2Score: 3
    })
    setLocation1({
      type: 'revealed',
      img: `${assetServiceUrl}/IMAGES/locations/location-mandalore.webp`,
      text: 'Instant abilities happen twice here',
      player1Score: 0,
      player2Score: 0
    })

    setCard({
      name: 'Grand Admiral Thrawne',
      abilityText: 'You can see your opponents play on turn 6',
      abilityType: 'trigger',
      cost: 2,
      power: 2,
      health: 3,
      tags: ['dark side, empire, imperial remnant'],
      image: `${assetServiceUrl}/IMAGES/card_fronts/thrawne.webp`,
      isVisible: true,
      isVariant: false
    })
    setCardOptions({
      level: '0'
    })

  }, [])

  return (
    <MainContainer title="SWGU | PLAY SCREEN" description="It's game time!" lineArt='none'>
      <div id="gameContainer" className="flex align-center justify-evenly min-w-[100vw] min-h-[100vh]">

        {/* LEFT Container - Player 2 */}
        <div id="player2">
          <ProfilePicture avatarName={'Sinali'} customTailwind={`min-w-[90px]`} />
          <div className="hand">
            <div className="dynamic-card"></div>
          </div>
          <div id="retreat-btn"></div>
        </div>

        {/* MIDDLE Container - Game board */}
        <div id="game-board" className="flex justify-evenly align-center w-90% min-w-[500px] p-0 m-0">
          <div id="column1" className="flex flex-col align-center justify-around">
            <div className="player2cards flex flex-wrap">
              <Card card={card} cardOptions={cardOptions} />
            </div>
            <Location location={location1} />
            <div className="player1cards">
              <Card card={card} cardOptions={cardOptions} />
            </div>
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

        {/* RIGHT Container - Player 1 */}
        <div id="player1">
          <ProfilePicture avatarName='Coil' customTailwind={`min-w-[90px]`} />
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