import { useState, useEffect } from "react";

import MainContainer from "../MainContainer/MainContiner";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Currency from "../Currency/Currency";
import Button from "../Button/Button";
import LittleButton from "../LittleButton/LittleButton";

import styles from './Home.module.css';
import { signOut } from "next-auth/react";
import InstallPWA from "../PWA/installBtn";
import BackgroundAudio from "../BackgroundAudio/BackgroundAudio";
import { motion } from "framer-motion";

/**
 * HOME PAGE - After signing in, you will go to this page
 */
const Home = ({user}) => {

  const [credits, setCredits] = useState<number>(0);
  const [crystals, setCrystals] = useState<number>(0);
  const [galacticFame, setGalacticFame] = useState<number>(0);

  /* Initially set Currency */
  useEffect(() => {
    setCredits(248500);
    setCrystals(324);
    setGalacticFame(102);
  }, []);

  return (
    <MainContainer title="SWGU | HOME" description="Galaxy Ultimate is the next best star wars online tcg!" bgImage="plain-background" lineArt="double">
      <BackgroundAudio styleClasses='absolute top-[15%] right-[3%]' />

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }} 
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className={`${styles["currency-container"]} mr-5 items-end`}>
          <Currency type="credits" amount={credits} />
          <Currency type="kyber-crystal" amount={crystals} />
        </div>
        <ProfilePicture imageDirection="horizontal" avatarName={user?.name} />
        <div className={`${styles["currency-container"]} ml-5 itmes-start`}>
          <Currency type="galactic-fame" amount={galacticFame} />
        </div>
      </motion.div>

      {/* Button-Container */}
      <div className={styles["button-container"]}>
        <Button text="Play" link="/app/play/setup" />
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
