import React from 'react';
import { technologies2 } from "../constants";

const images = [
  technologies2[15].icon,
  technologies2[4].icon,
  technologies2[3].icon,
  technologies2[0].icon,
  technologies2[14].icon,
  technologies2[10].icon,
];

const Image = React.memo(({image, className}) => {

  return (
    <div className={className}>
      <img
        className="image"
        loading="lazy"
        src={image}
        alt="Technology Icon"
      />
    </div>
  );
});

const RotatingCircleOfImages = () => {
  return (
    <div className="circle-container ml-10 md:ml-20">
      {images.map((image, index) => (
          <React.Fragment key={index}>          
              <Image image={image} className={`image-container image-container-${index + 1}`} />
          </React.Fragment>          
      ))}
    </div>
  );
};

export default RotatingCircleOfImages;