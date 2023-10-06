import CustomHead from "../CustomHead/CustomHead";
import LineArt from "../LineArt/LineArt";
import styles from "./MainContainer.module.css";

import { generateUniqueKey } from "../../util/functions";
import { CSSProperties } from "react";

/**
 * MainContainer(Should be used on all pages with a normal styled background)
 * 
 * @title - Page Title
 * @description - Page description 
 * @lineArt - determines quantity and position of LineArts on page
 * @overflow - determine whether or not there should be overflow on the page or not
 * @children - All of the HTML content inside of this container
 */
const MainContainer: React.FC<any> = ({ title, description, bgImage, lineArt, overflow, children }) => {

  /* Default prop values */
  title = title || 'SWGU';
  description = description || 'Star Wars Galaxy Ultimate - Card Game';
  overflow = overflow || 'hidden';
  lineArt = lineArt || 'single';
  bgImage = bgImage || 'plain-background';

  /* Set BackgroundImage */
  const bgImageStyle: CSSProperties = {
    backgroundImage: `url('https://swgu-library.onrender.com/images/BACKGROUNDS/${bgImage}.webp')`
  }
  
  /* LineArt preparation */
  const lineArtElements: React.ReactNode[] = [];
  if (lineArt !== 'none') {
    lineArtElements.push(<LineArt key={generateUniqueKey()} imageType='line-art' position='top' />)
    if (lineArt === 'double') {
      lineArtElements.push(<LineArt key={generateUniqueKey()} imageType='line-art-reverse' position='bottom' />)
    }
  }

  return (
    <>
      <CustomHead title={title} description={description} />
      <div className={styles.container}>
        <main className={styles["main-content"]} style={bgImageStyle}>
          {children}
        </main>
        {lineArtElements}
      </div>
    </>
  );
};

export default MainContainer;