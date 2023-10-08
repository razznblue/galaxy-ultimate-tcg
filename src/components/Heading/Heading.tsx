

const Header: any = ({ text, color }) => {
  color = color === 'blue' ? '#89A6DD' : '#FFF';

  return (
    <h1 className={`text-center mt-3 text-[${color}] text-3xl max-w-prose`}>{text}</h1>
  )
}

export default Header