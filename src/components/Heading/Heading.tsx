const Header: any = ({ text, color, textSize, styles }) => {
  color = color === 'blue' ? '#89A6DD' : '#FFF';

  return (
    <h1 className={`text-center mt-1 text-[#89A6DD] text-${textSize} max-w-prose ${styles}`}>{text}</h1>
  )
}

export default Header