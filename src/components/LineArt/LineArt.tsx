import { CSSProperties } from "react";
import { assetServiceUrl } from "../../util/constants";

/**
 * LineArt used in the {@link MainContainer} on the background of all
 * 
 * @imageType - determines which image to use 
 * @position - positions the element 
 */
const LineArt: any = ({ imageType, position }) => {
  const imgUrl = `${assetServiceUrl}/IMAGES/backgrounds/${imageType}.webp`

  const style: CSSProperties = {
    position: 'absolute',
    left: '0',
    width: '100%',
    height: '15%',
    backgroundImage: `url(${imgUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    objectFit: 'cover',
  }
  position === 'top' ? style.top = '0' : style.bottom = '0';
  position === 'top-center' ? style.top = '10%' : style.top;

  return <div style={style}></div>
}

export default LineArt;