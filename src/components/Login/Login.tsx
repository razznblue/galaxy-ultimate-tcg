import MainContainer from "../MainContainer/MainContiner";
import LittleButton from "../LittleButton/LittleButton";
import Image from "next/image";
import { CSSProperties } from "react";
import InstallPWA from "../PWA/installBtn";

const contentStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
}

const imgContainerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '30%'
}

const hStyles: CSSProperties = {
  color: '#FFF',
  textAlign: 'center',
  fontSize: 'max(6.5vw, 30px)',
  margin: '0',
  padding: '0'
}

const h2Styles: CSSProperties = {
  ...hStyles,
  marginTop: '-5%'
}

const Login = ({onClick}) => {
  return (
    <MainContainer title="SWGU | Sign In" description="Sign In Page of SWGU" bgImage="plain-background" lineArt="double">
      <div style={contentStyles} className="content">
        <div style={imgContainerStyles} className="img-container">
          <Image style={{
            width: '100%',
            height: 'auto'
          }} src='/images/app-icon-1024-transparent.png' alt='' width='50' height='50' />
        </div>
        <h1 style={hStyles}>GALAXY</h1>
        <h2 style={h2Styles}>ULTIMATE TCG</h2>
        <InstallPWA text={'Install'}/>
      </div>
      <LittleButton text="Sign In" imageDirection="right" onClick={onClick} />
    </MainContainer>
  );
};

export default Login