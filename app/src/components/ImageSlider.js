import React, { useState } from "react";
import Image from "next/image";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <div className="w-[600px] bg-red-500">
        <Image
          src={images[currentIndex]}
          alt={`Room ${currentIndex}`}
          className="w-full h-auto rounded-lg object-cover mb-4"
          width={800}
          height={800}
        />
        </div>
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Room ${index}`}
              className={`w-16 h-16 rounded-lg object-cover cursor-pointer ${
                index === currentIndex ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleImageClick(index)}
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2">
        {/* Add additional room details here */}
      </div>
    </div>
  );
};

export default ImageSlider;
