import React, {useState, useEffect} from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies, technologies2 } from "../constants";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { useLanguageContext } from "../utils/LanguageContext";
import CarouselSliderLoop from "../components/CarouselSliderLoop"
const renderTechnologies = () => {
  return technologies.map(({ name, icon }) => (
    <div className="w-28 h-28" key={name}>
      {/* <BallCanvas icon={icon} /> */}
      <p className={`${styles.sectionSubText} text-center`}>{name}</p>
    </div>
  ));
};
const Tech = () => {
  const { translate } = useLanguageContext();
  
  return (
    <div>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>{translate("tech.title")}</h2>
        <p className={`${styles.sectionSubText} `}>{translate("tech.subTitle")}</p>
      </motion.div>
      <div className='flex flex-row flex-wrap justify-center gap-10 mt-5 mb-12'>
        {renderTechnologies()}
      </div> 
      <div style={{marginTop: '4em'}}>
        <CarouselSliderLoop
          presetDirection={'left'}
          children={technologies2.map((technology) => (
            <div 
              className='w-28 flex flex-col text-center justify-center items-center' 
              style={{position: 'relative', zIndex: '-1', userSelect: 'none'}} // remove userSelect: 'none' TO DRAG
              key={technology.name}>
              <img className="w-[80px] h-[80px]" src={technology.icon} alt={technology.name} />
              <p className={`${styles.sectionSubText} text-center`}>{technology.name}</p> 
            </div>
          ))}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
