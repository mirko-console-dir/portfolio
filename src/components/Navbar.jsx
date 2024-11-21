import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useLanguageContext } from "../utils/LanguageContext";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguageContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  };
  
  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Mirko Saponaro &nbsp;
            <span className='sm:block hidden'> | &nbsp; Fullstack Developer</span>
          </p>
        </Link>
        <div className='flex justify-center gap-1'>
          <button
          className={`flag-icon flag-icon-gb mr-2 ${language === "en" ? "active" : ""}`} style={{borderRadius: '50%'}}
          onClick={() => handleLanguageChange("en")}
          ></button>
          <button
            className={`flag-icon flag-icon-it mr-2 ${language === "it" ? "active" : ""}`} style={{borderRadius: '50%'}}
            onClick={() => handleLanguageChange("it")}
          ></button>
            <button
            className={`flag-icon flag-icon-jp mr-2 ${language === "jp" ? "active" : ""}`} style={{borderRadius: '50%'}}
            onClick={() => handleLanguageChange("jp")}
          ></button>
        </div>
       
        <ul className='list-none hidden lg:flex flex-row gap-10 lg-mx-auto'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`} aria-label={nav.title}>{nav.title[language]}</a>
                </li>
              ))}
        </ul>

        <div className='lg:hidden flex justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title[language]);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title[language]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
