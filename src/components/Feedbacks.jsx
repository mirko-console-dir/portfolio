import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { useLanguageContext } from "../utils/LanguageContext";
import { Carousel } from "flowbite-react";
import FeedbackModal from "./modals/FeedbackModal";

const FeedbackCard = React.memo(({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  language
}) => {  
  return( 
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.5 }}
      className='bg-black-200 p-20 rounded-3xl'
      style={{minHeight: '100%'}}
    >
      <p className='text-white font-black text-[48px]'>"</p>
      <div className='mt-1'>
        <p className='text-white tracking-wider text-[18px]'>{testimonial[language]}</p>

        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
            <p className='text-white font-medium text-[16px]'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='mt-1 text-secondary text-[12px]'>
              {designation} of {company}
            </p>
          </div>

        </div>
        <div className="flex justify-center mt-10">
        {image ? (
          <FeedbackModal name={name} image={image}/>
        ) : (
              <p className={`${styles.sectionSubText} mt-10`}>reference available upon request</p>
        )}
        
        </div>
      </div>
    </motion.div>
  )
});

const Feedbacks = () => {
  
  const { language, translate } = useLanguageContext();

  return (
    <div id="testimonials" className={`mt-0 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>{translate('feedbacks.title')}</p>
            <h2 className={styles.sectionHeadText}>{translate('feedbacks.subTitle')}</h2>
        </motion.div>
      </div>
      <div className={`bg-tertiary rounded-2xl -mt-20 pb-16 ${styles.paddingX}`}>
      <Carousel slide={false}>
        {testimonials.slice().map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} language={language}/>
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");