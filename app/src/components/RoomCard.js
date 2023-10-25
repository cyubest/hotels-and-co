import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RoomCard = ({ room, categoryId }) => {
  const {
    id,
    name,
    description,
    images,
    price,
    location,
    beds,
    baths,
    distance_km,
  } = room;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const isNextDisabled = currentImageIndex === images.length - 1;
  const isPreviousDisabled = currentImageIndex === 0;

  function handleClick (){
    return router.push(`/room/${id}/${categoryId}`)
  }

  return (
    <div onClick={()=>handleClick()}  className="bg-white p-4 shadow-md rounded w-72 md:w-80 lg:w-96 mx-auto mb-4 xl:w-1/5 xl:mx-4 transition-transform duration-300 transform scale-100 hover:scale-105">
      <div className="relative mb-2 m-auto w-[100%] rounded-md h-40 overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 transform scale-100 hover:scale-105"
          width={400}
          height={400}
        />
        <div className="absolute w-[95%] justify-between top-1 left-2 flex flex-row items-center space-x-2 gap-2 pt-2">
          <div className="flex flex-row w-[60%] h-4 bg-gray-300 rounded-full ring-2 ring-gray-300">
            <Icon
              icon="mdi:map-marker"
              className="text-gray-600 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"
            />
            <p className="text-gray-600 text-xs max-w-[80%] truncate">
              {location}
            </p>
          </div>

          <div className="w-4 h-4 flex items-center justify-center bg-gray-300 rounded-full ring-2 ring-gray-300">
            <Icon
              icon="mingcute:heart-line"
              className="w-5 h-5 cursor-pointer text-black ring-gray-300 rounded-full"
            />
          </div>
        </div>
        {images.length > 1 && (
          <>
            {!isPreviousDisabled && (
              <Icon
                icon="pepicons-pencil:angle-left-circle"
                className="absolute w-8 h-8 text-lg top-1/2 left-2 transform -translate-y-1/2 cursor-pointer text-white bg-opacity-50 p-2  hover:bg-opacity-70"
                onClick={handlePreviousImage}
                color="#fff"
              />
            )}
            {!isNextDisabled && (
              <Icon
                icon="pepicons-pencil:angle-right-circle"
                className="absolute w-8 h-8 text-lg top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-white bg-opacity-50 p-2 hover:bg-opacity-70"
                onClick={handleNextImage}
                color="#fff"
              />
            )}
          </>
        )}
      </div>
      <div className="flex flex-row justify-between w-[95%] m-auto">
        <h2 className="text-sm font-semibold mb-2 ">{name}</h2>
        <div className="flex flex-row justify-between">
          <Icon icon="ic:baseline-star" className="text-orange-400" />
          <p className=" text-black text-sm font-bold mb-2"> 4.7</p>
        </div>
      </div>
      <div className="w-[95%] p-1">
      <p className=" text-blue-600 text-sm font-bold mb-2 m-auto">
        
        ${price}.00 / night
      </p>
      </div>
      <div className="flex flex-row justify-between w-[95%] sm:gap-2 m-auto">
        <div className="justify-center w-[70px] bg-gray-100 rounded-lg ring-1 ring-gray-300 gap-1">
        <div className="flex flex-row justify-center gap-1 p-1">
          <Icon
            icon="ion:bed-outline"
            className="text-black w-5 h-5 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis "
          />
          <p className=" text-black text-sm font-bold"> {beds}</p>
          <p className=" text-black text-sm font-bold"> beds</p>
          </div>
        </div>
        <div className="flex flex-row justify-center w-[70px] bg-gray-100 rounded-lg ring-1 ring-gray-300 gap-1">
        <div className="flex flex-row justify-center gap-1 p-1">
          <Icon
            icon="solar:bath-line-duotone"
            className="text-black w-3 h-5 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"
          />
          <p className=" text-black text-sm font-bold"> {baths}</p>
          <p className=" text-black text-sm font-bold"> baths</p>
          </div>
        </div>
        <div className="flex flex-row justify-center w-[70px] bg-gray-100 rounded-lg ring-1 ring-gray-300 gap-1">
        <div className="flex flex-row justify-center gap-1 p-1">
          <Icon
            icon="uil:expand-arrows-alt"
            className="text-black w-3 h-5 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"
          />
          <p className=" text-black text-sm font-bold"> {distance_km}</p>
          <p className=" text-black text-sm font-bold"> Km</p>
          </div>
        </div>
      </div> 
    </div>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomCard;
