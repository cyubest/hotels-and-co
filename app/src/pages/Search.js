import React from "react";
import Image from "next/image";
import CustomButton from "../../src/components/CustomButton";
import { Icon } from "@iconify/react";
import allImages from '../../../public/images/index'
import Categories from './Categories';

const Search = () => {
  function handleClick() {
    // Custom action to perform when the container is clicked
    // For example, you can navigate programmatically or perform other actions.
  }
  return (
    <div className="flex flex-col w-[100%] gap-5 "> 
    <div className="flex w-[100%] justify-between gap-5">
      <form className="flex w-full items-center gap-0">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className=" bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-l-[22px] focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
            placeholder="where are you going..."
            required
          />
        </div>
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Your Email
        </label>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center text-black  py-2.5 px-4 text-sm font-medium text-center bg-gray-100 border border-gray-300 rounded-r-2xl hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
          type="button"
        >
          Experiences{" "}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-r-[22px] shadow w-44"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 rounded-r-lg"
              >
                Mockups
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 rounded-r-lg"
              >
                Templates
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 rounded-r-lg"
              >
                Design
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 rounded-r-lg"
              >
                Logos
              </button>
            </li>
          </ul>
        </div>
      </form>
      <CustomButton onClick={() => handleClick()}>
        <svg
          className="w-4 h-4 rounded-full ring-2 ring-gray-300 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L1 13h3v8h6v-6h4v6h6v-8h3L12 2zm2 14h-4v6h-4v-4H8v4H4v-6H2l10-9 10 9h-2v6h-4v-4z" />
        </svg>
        <span className="text-sm text-center">Anchor home</span>
      </CustomButton>
      <div className="flex justify-center gap-3 items-center w-[90px] h-[40px] rounded-full bg-white border border-gray-300 p-1 transition duration-300 ease-in-out transform hover:shadow-md hover:scale-105">
        <Icon
          icon="mingcute:earth-line"
          className="w-5 h-5 cursor-pointer rounded-full ring-2 ring-gray-300 "
          color="#000"
          onClick={() => {}}
        />

        <Image
          className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-md"
          src={allImages.profile_pic}
          alt="Bordered avatar"
        />
      </div>
    </div>
    <Categories/>
    </div>
  );
};

export default Search;
