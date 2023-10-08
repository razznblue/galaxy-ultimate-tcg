const Header: any = ({ text, color }) => {
  color = color === 'blue' ? '#89A6DD' : '#FFF';

  return (
    <h1 className={`text-center mt-1 text-[#89A6DD] text-3xl max-w-prose`}>{text}</h1>
  )
}

export default Header