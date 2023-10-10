import Image from "next/image";
import { useState, useEffect, CSSProperties } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const LittleButton: any = ({ imageDirection, position, text, onClick }) => {
  const {windowWidth, windowHeight} = useWindowDimensions();

  imageDirection = imageDirection || 'left';
  text = text || 'back';

  const imgUrl = `https://swgu-library.onrender.com/images/ICONS/back-btn.webp`;

  const style: CSSProperties = {
    height: 'auto',
    width: '15%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: '1',
    marginTop: '6%',
    position: 'absolute',
    bottom: windowWidth < 900 && windowHeight > 500 ? '5%' : '2%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  style.bottom = position === 'top-left' ? '' : style.bottom;
  style.top = position === 'top-left' ? '7%' : '';
  style.left = position === 'top-left' ? '8%' : style.left;
  style.margin = position === 'top-left' ? 0 : style.margin;
  style.width = position === 'top-left' ? '' : style.width;

  const imgContainer: CSSProperties = {
    width: '20%',
    minWidth: '30px',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    marginRight: '3%'
  }

  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
  }
  if (imageDirection === 'left') {
    imgStyle.transform = 'rotate(180deg)';
  }

  const textStyles: CSSProperties = {
    fontSize: 'max(3vw, 20px)'
  }

  return(
    <div style={style} onClick={onClick}>
      <div style={imgContainer}><Image src={imgUrl} width="100" height="100" alt="" style={imgStyle} /></div>
      <p style={textStyles}>{text}</p>
    </div>
  )
}

export default LittleButton;