import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="">
    <div className="flex p-4">
      <div className="flex items-center border-4 border-gray-900 bg-orange-400 px-8 py-2 font-semibold tracking-tighter transition duration-300 hover:bg-gray-900 hover:text-white md:mb-0 ">
        <Link to="/">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-3xl">UZUMAKI DRAW</span>
          </div>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
