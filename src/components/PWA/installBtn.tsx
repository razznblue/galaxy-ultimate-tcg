import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { playSecondarySound } from "../../util/sfx";

const InstallPWA = ({text, placement}) => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const {windowWidth, windowHeight} = useWindowDimensions()

  useEffect(() => {
    const handler = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const handleInstall = (evt) => {
    playSecondarySound();
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  }; 
  if (!supportsPWA && process.env.NODE_ENV === 'production') {
    console.warn('Hiding install button because PWA is not supported on this device');
    return null;
  }
  return (
    <h6 style={{
      position: 'absolute',
      bottom: '20%',
      right: windowWidth < 900 && windowHeight > 500 ? '' : '5%',
      color: '#FFF',
      cursor: 'pointer',
      margin: '-3%',
      fontSize: 'max(1.2vw, 20px)',
      textDecoration: 'underline',
    }} className="" onClick={handleInstall}>{text} &#8594;</h6>
  );
};

export default InstallPWA;