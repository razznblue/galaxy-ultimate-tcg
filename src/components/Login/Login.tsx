import MainContainer from "../MainContainer/MainContiner";
import LittleButton from "../LittleButton/LittleButton";
import Image from "next/image";
import { CSSProperties } from "react";
import InstallPWA from "../PWA/installBtn";
import { motion } from "framer-motion";
import Text from "../Text/Text";

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
  width: '30%',
  paddingTop: '7%'
}

const hStyles: CSSProperties = {
  color: '#FFF',
  textAlign: 'center',
  fontSize: 'max(6.5vw, 55px)',
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
        <motion.div 
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} 
          transition={{ type: "spring", stiffness: 100 }}
          style={imgContainerStyles} 
          className="img-container">
          <Image style={{
            width: '100%',
            height: 'auto'
          }} src='/images/app-icon-1024-transparent.png' alt='' width='50' height='50' priority={true} />
        </motion.div>
        <Text text="Galaxy" customStyle={hStyles} animationType='spring' />
        <Text text="Ultimate TCG" customStyle={h2Styles} animationType='spring' />
        <InstallPWA text={'Install'} placement={'default'}/>
      </div>
      <LittleButton text="Login" imageDirection="right" onClick={onClick} />
    </MainContainer>
  );
};

export default Login
