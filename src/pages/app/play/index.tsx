import type { NextPage } from 'next'
import MainContainer from '../../../components/MainContainer/MainContiner'
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture'


const GameScreen: NextPage = () => {
  return (
    <MainContainer title="SWGU | PLAY SCREEN" description="It's game time!" lineArt='none'>
      {/* <Header text='Play' textSize='3xl' /> */}
      <div id="gameContainer">
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
            <div id="location1"></div>
            <div className="player1cards"></div>
          </div>
          <div id="column2">
            <div className="player2cards"></div>
            <div id="location2"></div>
            <div className="player1cards"></div>
          </div>
          <div id="column3">
            <div className="player2cards"></div>
            <div id="location3"></div>
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