import Image from "next/image";
import { CSSProperties } from "react";

const LittleButton: any = ({ imageDirection, text, onClick }) => {
  imageDirection = imageDirection || 'left';
  text = text || 'back';

  const imgUrl = `https://swgu-library.onrender.com/images/ICONS/back-btn.webp`;

  const style: CSSProperties = {
    width: '13%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: '1',
    marginTop: '6%',
    position: 'absolute',
    bottom: '2%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const imgContainer: CSSProperties = {
    width: '30%',
    height: 'auto',
  }

  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
  }
  if (imageDirection === 'left') {
    imgStyle.transform = 'rotate(180deg)';
  }

  const textStyles: CSSProperties = {
    fontSize: '155%'
  }

  return(
    <div style={style} onClick={onClick}>
      <div style={imgContainer}><Image src={imgUrl} width="100" height="100" alt="" style={imgStyle} /></div>
      <p style={textStyles}>{text}</p>
    </div>
  )
}

export default LittleButton;