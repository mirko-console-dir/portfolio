import React, { useRef, useEffect } from 'react';
import { motion, useAnimation,useDragControls } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const TICKER_DIRECTION_LEFT = -1;
const TICKER_DIRECTION_RIGHT = 1;


const noop = () => {};

const CarouselSliderLoop = (props) => {
  const {
    children,
    presetDirection,
    duration = 65,
    onMouseEnter = noop,
    onMouseLeave = noop,
    isPlaying = true,
    direction = presetDirection === 'left' ? TICKER_DIRECTION_LEFT : TICKER_DIRECTION_RIGHT,
  } = props;

  const containerRef = useRef(null);
  const tickerContentWidth = useRef(0);
  const numDupes = useRef(10);

  const controls = useAnimation();

  useEffect(() => {
    const calculateContentWidth = () => {
      let contentWidth = 0;

      children.forEach((_, index) => {
        const element = document.getElementById(`${index}`);
        if (element) {
          contentWidth += element.clientWidth;
        }
      });
      tickerContentWidth.current = contentWidth;
    };

    calculateContentWidth();
    
    controls.start({
      x: tickerContentWidth.current ? tickerContentWidth.current * direction : 0,
      transition: { ease: 'linear', duration, repeat: Infinity },
    });
  }, [children]);


  return (
    <div
      className=""
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 100,
        paddingTop: '30px',
        paddingBottom: '30px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '30px',
          background: 'linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
          zIndex: 1,
        }}
      />
      <motion.div
        className=""
        animate={controls}
        style={{ display: 'flex', gap: 10 }}
      >
        {children.map((item, index) => (
          <div key={uuidv4()} id={`${index}`}>
            {item}
          </div>
        ))}
        {[...Array(numDupes)].map((_, dupeIndex) =>
          children.map((item, index) => <div key={uuidv4()}>{item}</div>)
        )}
      </motion.div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '30px',
          background: 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
          zIndex: 1,
        }}
      />
    </div>
  );
};


export default CarouselSliderLoop;

export { TICKER_DIRECTION_LEFT, TICKER_DIRECTION_RIGHT };
