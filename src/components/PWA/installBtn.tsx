import React, { useEffect, useState } from "react";

const InstallPWA = ({text}) => {
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
    <button className="w-48 text-xl font-bold uppercase rounded-full py-2 px-8 max-w-[300px] text-azul border border-azul" onClick={handleInstall}>
        <h6 className="">{text}</h6>
    </button>
  );
};

export default InstallPWA;