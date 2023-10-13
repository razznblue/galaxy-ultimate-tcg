import { motion } from "framer-motion";

const Text: any = ({ text, customStyle, animationType }) => {

    /* TYPEWRITER */
    if (animationType === 'typeWriter') {
        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.5 }
            }
          };
        
        const charVariants = {
            hidden: { opacity: 0, y: '100%' },
            visible: { opacity: 1, y: '0' }
        };

        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={customStyle}
            >
                {text.split('').map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
                ))}
            </motion.div>
        )
    }

    /* SPRING */
    if (animationType === 'spring') {
        return (
            <motion.div
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} 
                transition={{ type: "spring", stiffness: 100 }}
                style={customStyle}
            >{text}</motion.div>
        )
    }

    /* If no animation is specified, the default is NO ANIMATION */
    return <div style={customStyle}>{text}</div>

}
  
export default Text
