import React from 'react';

const SampleImage = ({ image, index,onSelectImage }) => {

  return (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          onClick={() => onSelectImage(image.src)}
          style={{
            width: "100px",
            height: "100px",
            margin: "10px",
            cursor: "pointer",
            border: "2px solid #ccc",
            borderRadius: "8px",
            transition: "transform 0.3s",
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        />
     
   
  );
};

export default SampleImage;
