import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import {harvardCertificate} from "../assets";
import "react-vertical-timeline-component/style.min.css";
import { useLanguageContext } from "../utils/LanguageContext";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = React.memo(({ experience, language }) => {
  const points = experience.points[language] || [];
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[80%] h-[80%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
});

const Experience = () => {
  const { language, translate } = useLanguageContext();
  return (
    <React.Fragment>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          {translate('experience.title')}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {translate('experience.subTitle')}
        </h2>
      </motion.div>
      <p style={{ textAlign: 'center', textDecoration: 'underline' }} className="p-0">
        <a href={harvardCertificate} target="_blank" rel="noopener noreferrer">
          Harvard Certificate
        </a>
      </p>
      <div className='mt-10 flex flex-col'>
        <VerticalTimeline>
            <>
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={`experience-${index}`}
                  experience={experience}
                  language={language}
                />
              ))}
            </>     
        </VerticalTimeline>
      </div>
    </React.Fragment>
  );
};

export default SectionWrapper(Experience, "work");
