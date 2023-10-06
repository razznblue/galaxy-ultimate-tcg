import Image from "next/image";
import { CSSProperties } from "react";

const ProfilePicture: any = ({ imageDirection, showAvatar, avatarName, avatarImg }) => {
  showAvatar = showAvatar || true;
  avatarName = avatarName || 'Player';
  avatarImg = avatarImg || 'https://swgu-library.onrender.com/images/BACKGROUNDS/default-profile.png';

  const imgUrl = `https://swgu-library.onrender.com/images/ICONS/sci-fi-border-${imageDirection}.webp`

  const style: CSSProperties = {
    width: 'auto',
    height: '80%',
    marginTop: '3rem',
    position: 'relative'
  }

  const imgStyles: CSSProperties = {
    width: '100%',
    height: '100%',
  }

  const avatarStyles: CSSProperties = {
    position: 'absolute',
    left: '0',
    bottom: '-20%',
    width: '100%',
    height: '50%',
    background: `url('https://swgu-library.onrender.com/images/ICONS/avatar-border.webp')`, // Set the background image
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const avatarTextStyles: CSSProperties = {
    fontSize: '100%'
  }

  const avatarImgStyles: CSSProperties = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: '60%',
    cursor: 'pointer'
  }

  return (
    <div style={style}> 
      <Image src={imgUrl} width="100" height="100" alt="" style={imgStyles} /> 
      <Image src={avatarImg} width="100" height="100" alt="" style={avatarImgStyles} />
      <div className="avatar-border" style={avatarStyles}>
        <p style={avatarTextStyles}>{avatarName}</p>
      </div>
    </div>
  )
}

export default ProfilePicture;