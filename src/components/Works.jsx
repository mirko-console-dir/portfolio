import React, {useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguageContext } from "../utils/LanguageContext";
import { Carousel } from "flowbite-react";


const ProjectCard = React.memo(({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  translate,
  language
}) => {

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  const nameProject = name[language] || "";
  const descriptionProject = description[language] || "";

  return (
    <>
          <motion.div
            className="cursor-pointer w-full"
            style={{height: 'auto'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
            onClick={source_code_link ? () => window.open(source_code_link, "_blank") : toggleModal}
          >
            <Tilt
              style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className='bg-tertiary p-5 rounded-2xl'
              whileInView={() => {
              // when element in viewport , set IsInView true!
              setIsInView(true);
              return {};
              }}
            >
            <div 
              className='relative w-full h-[230px] cursor-pointer'  
              >
              <img
                src={image}
                alt='project_image'
                className='w-full h-full object-cover rounded-2xl'
              />

              <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
                <div
                  className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                >
                  <img
                    src={github}
                    alt='source code'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              </div>
            </div>

            <div className='my-5'>
              <h3 className='text-white font-bold text-[24px]'>{nameProject}</h3>
              <p className='mt-2 text-secondary text-[14px]'>{descriptionProject}</p>
            </div>

            <div className='flex flex-wrap gap-2 mt-auto' >
              {tags.map((tag) => (
                <p
                  key={`${name}-${tag.name}`}
                  className={`text-[14px] ${tag.color}`}
                >
                  #{tag.name}
                </p>
              ))}
            </div>
          </Tilt>
        </motion.div>
       {/* Modal */}
       {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-40'>
          <div className='bg-white p-5 rounded-lg flex' style={{flexDirection: 'column', justifyContent: 'center', gap: 20}}>
            <p style={{color: 'black'}}>{translate('noLinkRepos.message')}</p>
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md' onClick={toggleModal}>{translate('noLinkRepos.button')}</button>
          </div>
        </div>
      )}
    </>
  );
});

const Slide = ({filteredProjects,translate,language}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {filteredProjects.map((project, index) => (
        <ProjectCard 
          key={`project-${index}`} 
          index={index} 
          {...project} 
          translate={translate} 
          language={language} 
        />
      ))}
    </div>
  )
}

const Works = () => {
  const {language, translate } = useLanguageContext();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const [projInSlide, setProjInSlide] = useState(1)

  useEffect(() => {
    // Add listeners for changes to the screen size
    const phoneQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
  
    // Set the initial value of the `isMobile`, `isTablet`, and `isPC` state variables
    setIsMobile(phoneQuery.matches);
    setIsTablet(tabletQuery.matches);
    setIsPC(!phoneQuery.matches && !tabletQuery.matches);
  
    // Define callback functions to handle changes to the media queries
    const handlePhoneQueryChange = (event) => {
      setIsMobile(event.matches);
    };
  
    const handleTabletQueryChange = (event) => {
      setIsTablet(event.matches);
    };
  
    // Add the callback functions as listeners for changes to the media queries
    phoneQuery.addEventListener("change", handlePhoneQueryChange);
    tabletQuery.addEventListener("change", handleTabletQueryChange);
    
    if(phoneQuery.matches) {
      setProjInSlide(1)
    }
    else if(tabletQuery.matches) {
      setProjInSlide(4)
    }
    else {
      setProjInSlide(6)
    }

    // Remove the listeners when the component is unmounted
    return () => {
      phoneQuery.removeEventListener("change", handlePhoneQueryChange);
      tabletQuery.removeEventListener("change", handleTabletQueryChange);
    };
  }, []);
  
  // FILTER PROJECTS
  const [selectedTag, setSelectedTag] = useState("");

  const [filteredProjects, setFilteredProjects] = useState(projects);

  const filterProjectsByTag = (tag) => {
    setSelectedTag(tag);
    if (tag === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.tags.some((t) => t.name === tag)
      );
      setFilteredProjects(filtered);
    }
  };

  // Set and filter the projects for slides
  const [carouselSlides, setCarouselSlides] = useState([]);
  useEffect(() => {
    let countNumSlides = Math.round(filteredProjects.length / projInSlide);
    if(countNumSlides == 0)
    {
      countNumSlides = 1;
    }

    let fromProj;
    let toProj;
    let newSlides = [];
    for (let i = 0; i < countNumSlides; i++) {
      if (i === 0) {
        fromProj = i;
      } else {
        fromProj = toProj;
      }
      toProj = fromProj + projInSlide;
      newSlides.push(filteredProjects.slice(fromProj, toProj));
    }
    setCarouselSlides(newSlides);
  },[filteredProjects, projInSlide])
  // Set and filter the projects for slides
  // END FILTER PROJECTS
  
  return (
    <React.Fragment>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>{translate('works.title')}</p>
        <h2 className={`${styles.sectionHeadText}`}>{translate('works.subTitle')}</h2>
      </motion.div>
      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          {translate('works.description')}
        </motion.p>
      </div>
      {/* FILTER PROJECTS */}
      <div className='flex flex-wrap justify-center gap-4 mt-10' >
        <button
            onClick={() => filterProjectsByTag("")}
            className={`${
              selectedTag === "" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            } px-4 py-2 rounded-md`}
          >
            All
          </button>
        {
          [...new Set(projects.flatMap((project) => project.tags.map((tag) => tag.name)))]
          .sort((a, b) => a.localeCompare(b))
          .map((tag) => (
            <button
              key={tag}
              onClick={() => filterProjectsByTag(tag)}
              className={`${
                selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
            >
              {tag.toUpperCase()}
            </button>
          ))
        }
       
      </div>
      {/* END FILTER PROJECTS */}

        <div className='mt-10 flex flex-wrap gap-7 md:gap-10' >
          <Carousel slide={false}>
            {
              carouselSlides.map((slideProjects, index) => (
                <Slide 
                  key={index}
                  filteredProjects={slideProjects}
                  translate={translate} 
                  language={language} 
                />
              ))
            }
          </Carousel>
        </div>

      <motion.div variants={textVariant()}  className='flex flex-row mt-10 items-center'>
        <p className={`${styles.sectionSubText} `}>
            <span className={`${styles.sectionHeadText}`}>{translate('works.gitHubSection.title')}</span> <br/> 
            {translate('works.gitHubSection.subTitle')}{" "}
        </p>
        <div className='relative inset-0 flex justify-end m-3 card-img_hover'>
          <div
            onClick={() => window.open("https://github.com/mirko-console-dir")}
            className='black-gradient w-20 h-20 rounded-full flex justify-center items-center cursor-pointer'
          >
            <img src={github} alt='source code' className='w-1/2 h-1/2 object-contain' />
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default SectionWrapper(Works, "projects");
