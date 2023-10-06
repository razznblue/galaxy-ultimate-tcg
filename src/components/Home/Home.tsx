import { useState, useEffect, CSSProperties } from "react";

import MainContainer from "../MainContainer/MainContiner";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Currency from "../Currency/Currency";
import Button from "../Button/Button";
import LittleButton from "../LittleButton/LittleButton";

import styles from './Home.module.css';
import { signOut } from "next-auth/react";
import InstallPWA from "../PWA/installBtn";

/**
 * HOME PAGE - After signing in, you will go to this page
 */
const Home = ({user}) => {

  const [credits, setCredits] = useState<number>(0);
  const [crystals, setCrystals] = useState<number>(0);
  const [galacticFame, setGalacticFame] = useState<number>(0);

  useEffect(() => {
    setCredits(248500);
    setCrystals(324);
    setGalacticFame(102);
  }, []);

  return (
    <MainContainer title="SWGU | HOME" description="Home Page of SWGU" bgImage="plain-background" lineArt="double">
      <div className={styles.container}>
        <div className={styles["currency-container"]}>
          <Currency type="credits" amount={credits} />
          <Currency type="kyber-crystal" amount={crystals} />
        </div>
        <ProfilePicture imageDirection="horizontal" avatarName={user?.name} />
        <div className={styles["currency-container"]}>
          <Currency type="galactic-fame" amount={galacticFame} />
        </div>
      </div>

      {/* Button-Container */}
      <div className={styles["button-container"]}>
        <Button text="Play!" link="/app/play" />
        <Button text="Collection" link="/app/collection" />
        <Button text="Settings" link="/app/settings" />
        <Button text="Shipments" link="/app/shipments" />
      </div>
      <InstallPWA text={"install"} placement={"bottom"} />

      <LittleButton text="Logout" imageDirection="right" onClick={signOut} />


    </MainContainer>
  );
};

export default Home;