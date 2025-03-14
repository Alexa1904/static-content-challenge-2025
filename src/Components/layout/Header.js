/* eslint-disable @next/next/no-img-element */
import React from 'react';// Import Link from react-router-dom

const Header = () => {
  return (
    <div className="w-full bg-white h-24 shadow-md flex items-center justify-center mb-16 ">
      <div className="w-11/12 relative flex flex-col justify-center md:flex-row md:justify-start items-center">
        <img src="/images/acmeco_logo.png" alt="LOGO" className="w-40 md:w-56" />
        <p className="font-semibold md:absolute md:right-0 lg:text-xl text-lg font-sans text-[#343A3E]">
          Content Management System
        </p>
      </div>
    </div>
  );
};
``;
export default Header;
