// RoomCategories.js
import React, { useState, useEffect, useRef } from "react";
import { fetchCategories, fetchRooms } from "../services/api";
import { Icon } from "@iconify/react";
import CustomButton from "../components/CustomButton";
import { useQuery } from "react-query";
import RoomCard from "../components/RoomCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedRooms, setLoadedRooms] = useState([]);

  const {
    data: rooms,
    isLoading,
    isError,
    isFetching,
    previousData,isPreviousData
  } = useQuery(["rooms", currentPage], () => fetchRooms(currentPage), {
    keepPreviousData: true,
  });
  const [categories, setCategories] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const categoryWrapperRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [filterLoading, seFilterLoading] = useState(false);
  const cat = 1;

  // Load more rooms when user scrolls to the bottom
  const handleRefresh = () => {
    setFilteredRooms([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching &&
        !isPreviousData &&
        hasMore
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, isPreviousData, hasMore]);

  // Check if there are no more rooms to fetch, set hasMore to false
//   useEffect(() => {
//     if (rooms && rooms.length === 0) {
//       setHasMore(false);
//     }
//   }, [rooms]);

  useEffect(() => {
    seFilterLoading(true);
    if (rooms && rooms.length > 0) {
      // Set initial selected category and filtered rooms based on the first category
      const initialCategory = rooms[0].category;
      const initialRoomList = rooms[0].roomList;
      setSelectedCategory(initialCategory);
      setCategories(rooms);
      if (typeof initialCategory.roomList !== "undefined") {
        setLoadedRooms(initialCategory.roomList);
        setInitialList(initialCategory.roomList);
        seFilterLoading(false);
      }
    }
  }, [rooms]);

  useEffect(() => {
    if (rooms && rooms.length === 0) {
      setHasMore(false);
    } else if (isPreviousData) {
      // Append new data to loadedRooms state
      setLoadedRooms((prevRooms) => [
        ...prevRooms,
        ...rooms[0].roomList,
      ]);
    }
  }, [rooms, isPreviousData]);

  const handleCategoryClick = (index) => {
    setActiveCategoryIndex(index);
    setSelectedCategory(categories[index].category);
    setFilteredRooms(categories[index].roomList);
    // Add any additional handling logic for category click, if needed
  };

  const handleScrollLeft = () => {
    setScrollPosition(Math.max(scrollPosition - 1, 0));
  };

  const handleScrollRight = () => {
    setScrollPosition(Math.min(scrollPosition + 1, categories.length - 1));
  };

  // Filter rooms based on the selected category
  //   const roomsFiltered = rooms.flatMap((category) => category.roomList);

  //   const isCategoryVisible = (index) => {
  //     const categoryElement = categoryWrapperRef.current.children[index];
  //     if (categoryElement) {
  //       const { left, right } = categoryElement.getBoundingClientRect();
  //       return (
  //         left >= categoryWrapperRef.current.left &&
  //         right <= categoryWrapperRef.current.right
  //       );
  //     }
  //     return false;
  //   };

  if (isLoading) {
    return (
      <div role="status" className=" flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading rooms</div>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Icon
          icon="pepicons-pencil:angle-left-circle"
          className={`w-6 h-6 cursor-pointer ${
            scrollPosition === 0 ? "text-gray-300" : ""
          }`}
          onClick={handleScrollLeft}
        />
        <div
          className="flex items-center w-full px-4 py-2 space-x-2 overflow-x-auto scrollbar-hidden"
          ref={categoryWrapperRef}
        >
          { rooms ? rooms.map((category, index) => (
            <div
              key={category.id}
              className={`flex w-full items-center space-x-2 cursor-pointer whitespace-nowrap  ${
                index === activeCategoryIndex
                  ? "underline text-blue-600 font-bold"
                  : "text-black"
              }`}
              onClick={() => {
                handleCategoryClick(index);
                setSelectedCategory(category);
              }}
            >
              <h2 className="text-airbnb-blue font-normal text-sm">
                {category.category}
              </h2>
            </div>
          )):<button
          className=" flex flex-row gap-4 text-sm justify-center text-blue-600 cursor-pointer"
          onClick={handleRefresh}
        >
          <Icon icon="bx:bx-refresh" className="w-5 h-5 mr-2" />
          Refresh
        </button>}
        </div>
        <Icon
          icon="pepicons-pencil:angle-right-circle"
          className={`w-6 h-6 cursor-pointer pr-2 ${
            scrollPosition === categories.length - 1 ? "text-gray-300" : ""
          }`}
          onClick={handleScrollRight}
        />

        <div className="flex space-x-2">
          <CustomButton
            onClick={()=>handleRefresh()}
          >
            <Icon
              icon="bx:bx-refresh"
              className="w-6 h-6 cursor-pointer pr-2 text-blue-600"
            />
            <span className="text-sm text-center">Load categories</span>
          </CustomButton>
          <CustomButton
            onClick={() => {
              /* Handle button click */
            }}
          >
            <Icon
              icon="system-uicons:filtering"
              className={`w-6 h-6 cursor-pointer pr-2 ${
                scrollPosition === categories.length - 1 ? "text-gray-300" : ""
              }`}
              onClick={handleScrollRight}
            />
            <span className="text-sm text-center">Filters</span>
          </CustomButton>
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 w-full my-2" />

      <div className="flex flex-wrap gap-14 md:gap-9 pt-2 pl-0 pr-0">
      {filteredRooms.length !== 0 ? (
          filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} categoryId={selectedCategory.id} />
          ))
        ) : rooms[0] && rooms[0].roomList ? (
          rooms[0].roomList.map((room) => (
            <RoomCard key={room.id} room={room} categoryId={cat} />
          ))
        ) : (
            loadedRooms.map((room) => (
                <RoomCard key={room.id} room={room} categoryId={cat} />
              ))
        )}
      </div>
      {loadedRooms.length !==0 ?<div className=" text-center">No rooms available.</div>:''}
      <button
        className=" flex flex-row gap-4 text-sm justify-center text-blue-600 cursor-pointer"
        onClick={handleRefresh}
      >
        <Icon icon="bx:bx-refresh" className="w-5 h-5 mr-2" />
        Refresh
      </button>
      <div className="my-8 p-6 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Compare to Hotel&Co</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold mb-2">Room Size</h3>
              <p className="text-gray-600">Spacious</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <p className="text-gray-600">Luxurious</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        &copy; 2023 Hote&Co, Inc. All rights reserved. |{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms
        </a>{" "}
        ·{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy
        </a>{" "}
        ·{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Sitemap
        </a>
      </div>
    </>
  );
};

export default Categories;
