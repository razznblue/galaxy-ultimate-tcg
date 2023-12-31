import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import Text from "../Text/Text";
import { playButtonClick } from "../../util/sfx";
import { assetServiceUrl } from "../../util/constants";

const Button: any = ({ imageType, text, link, position }) => {
  imageType = imageType || 'menu-btn';
  text = text || 'undefined';

  const imgUrl = `${assetServiceUrl}/IMAGES/icons/${imageType}.webp`;

  const style: CSSProperties = {
    position: 'relative',
    width: '50%',
    height: 'auto',
    cursor: 'pointer',
  }
  style.position = position === 'bottom' ? 'absolute' : style.position;
  style.bottom = position === 'bottom' ? '8%' : '';
  style.width = position === 'bottom' ? '25%' : style.width;

  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
  }

  const textStyles: CSSProperties = {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 'max(2vw, 20px)',
    color: '#FFF'
  }

  return(
    <Link href={link} style={style} onClick={playButtonClick}>
      <Image src={imgUrl} width="100" height="100" alt="" style={imgStyle} />
      <Text text={text} customStyle={textStyles} animationType='typeWriter' />
    </Link>
  )
}

export default Button;