import React from "react";

const Header = () => (
  <header className=" text-gray-600">
    <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
      <div className="mb-4 flex items-center font-medium text-gray-900 md:mb-0">
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
        <span className="ml-3 text-xl">UzumakiDraw</span>
      </div>
    </div>
  </header>
);

export default Header;
