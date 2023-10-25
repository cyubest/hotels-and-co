"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { fetchRoomDetails } from "../../../src/services/api";
import ImageSlider from '../../../src/components/ImageSlider';
import allImages from "@/public/images";
import {reviews,similarListings,amenities} from "../../../src/utils/constants";
import SkeletonLoader from '../../../src/components/SkeletonLoader'

const RoomDetails = ({ params }) => {
  const router = useRouter();
  const [room, setRoom] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("param id",params.categoryId,params.id)
  let roomId = params?.id;
  let categoryId = params?.categoryId;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await fetchRoomDetails(roomId, categoryId);
        setRoom(roomData);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRoom();
    }

    // Cleanup function to cancel the fetch if the component unmounts
    return () => {
      // Your cleanup logic here, if needed
    };
  }, [roomId,categoryId]);

  if (loading) {
    return <SkeletonLoader/>;
  }

  if (error) {
    return <div>Error loading room details.</div>;
  }

  if (!room) {
    return <div>Room not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row mb-8">
        <div className="lg:w-1/2 pr-8">
          <div className="mb-6 relative rounded-lg overflow-hidden">
            <div className="mb-8">
              <ImageSlider images={room.images} />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">{room.name}</h1>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <div className="flex items-center mb-4">
            <svg
              className="w-4 h-4 text-gray-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2C6.13 2 3 5.13 3 9c0 2.21 1.17 4.66 3.23 7.36.32.43.77.78 1.32 1.04.23.11.47.2.72.28.53.14 1.08.21 1.73.21s1.2-.07 1.73-.21c.25-.08.49-.17.72-.28.55-.26 1-.61 1.32-1.04C15.83 13.66 17 11.21 17 9c0-3.87-3.13-7-7-7zm1 12h-2v2h2v-2zm0-8h-2v6h2V6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600">{room.location}</p>
            <svg
              className="ml-auto w-6 h-6 cursor-pointer text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l1.086 1.086 1.086-1.086a1 1 0 111.414 1.414l-1.086 1.086 1.086 1.086a1 1 0 11-1.414 1.414l-1.086-1.086-1.086 1.086a1 1 0 11-1.414-1.414l1.086-1.086-1.086-1.086a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ${room.price} / night
          </p>
          <div className="flex mb-4 space-x-4">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM4 10a1 1 0 100 2h12a1 1 0 100-2H4zm-1 3a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-600">{room.beds} beds</p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2C6.13 2 3 5.13 3 9c0 2.21 1.17 4.66 3.23 7.36.32.43.77.78 1.32 1.04.23.11.47.2.72.28.53.14 1.08.21 1.73.21s1.2-.07 1.73-.21c.25-.08.49-.17.72-.28.55-.26 1-.61 1.32-1.04C15.83 13.66 17 11.21 17 9c0-3.87-3.13-7-7-7zm1 12h-2v2h2v-2zm0-8h-2v6h2V6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-600">{room.beds} Km</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 focus:outline-none">
            Book Now
          </button>
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="flex flex-wrap">
          {amenities.map((amenity, index) => (
            <div key={index} className="w-1/2 mb-4 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM4 10a1 1 0 100 2h12a1 1 0 100-2H4zm-1 3a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-600">{amenity}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="flex flex-col">
          {reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <p className="text-gray-400">- {review.user}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        {/* Placeholder map image */}
        <Image
          src={allImages.Hotels_on_Google_Maps}
          alt="Map"
          className="w-full h-[500px] object-cover rounded-lg"
          width={1000}
          height={2000}
        />
      </div>

      {/* Similar Listings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Listings</h2>
        <div className="flex flex-wrap">
          {similarListings.map((listing, index) => (
            <div key={index} className="w-1/2 mb-4 pr-4">
              <div className="border rounded-lg overflow-hidden">
                {/* Listing Image */}
                <Image
                  src={room.images[0]}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                  width={100}
                 height={100}
                />
                {/* Listing Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{listing.name}</h3>
                  <p className="text-gray-600">${room.price} / night</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
