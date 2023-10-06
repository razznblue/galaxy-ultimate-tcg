import React, { useEffect, useState } from "react";

const InstallPWA = ({text, placement}) => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

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
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }
  return (
    <h6 style={{
      color: '#FFF',
      cursor: 'pointer',
      margin: '-3%',
      fontSize: 'max(1.2vw, 20px)',
      textDecoration: 'underline',
      marginTop: placement === 'bottom' ? '0.7%' : ''
    }} className="" onClick={handleInstall}>{text} &#8594;</h6>
  );
};

export default InstallPWA;