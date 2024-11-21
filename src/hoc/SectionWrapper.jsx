import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
/* the purpose of the StarWrapper HOC is to wrap the Component with a motion.section, allowing you to apply animations to it using the framer-motion library. The animation is triggered when the motion.section comes into view. */
const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      /*to animate variants={staggerContainer()} from utils/motion */
      <motion.section
        variants={staggerContainer()} 
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
