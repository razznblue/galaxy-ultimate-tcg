import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

const Button: any = ({ imageType, text, link, position }) => {
  imageType = imageType || 'menu-btn';
  text = text || 'undefined';

  const imgUrl = `https://swgu-library.onrender.com/images/ICONS/${imageType}.webp`;

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
    fontSize: 'max(2vw, 20px)'
  }

  return(
    <Link href={link} style={style}>
      <Image src={imgUrl} width="100" height="100" alt="" style={imgStyle} />
      <p style={textStyles}>{text}</p>
    </Link>
  )
}

export default Button;