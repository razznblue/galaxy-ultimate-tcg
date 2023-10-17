import Image from "next/image";
import { textColor } from "../../styles/theme";
import styles from './Currency.module.css'
import Text from "../Text/Text";

const Currency: any = ({ type, amount }) => {
  const imgUrl = `https://swgu-library.onrender.com/images/OBJECTS/${type || 'credits'}.webp`

  return (
    <div className={`${styles.currency}`}>
      <Image className={styles["currency-image"]} width="100" height="100" src={imgUrl} alt="" />
      {/* <Text text={amount.toString()} animationType='typeWriter' className={styles["currency-text"]} inlineStyle={{color: textColor}} /> */}
      <p className={styles["currency-text"]} style={{color: textColor}} >{amount}</p>
    </div>
  )
}

export default Currency;