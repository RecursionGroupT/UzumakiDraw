import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { authState } = useContext(AuthContext);

  return (
    <header className="">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row md:justify-between">
        <div>
          <Link to="/">
            {/* <div className="flex items-center border-4 border-gray-900 bg-orange-400 px-8 py-2 font-semibold tracking-tighter transition duration-300 hover:bg-gray-900 hover:text-white md:mb-0 ">
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
            </div> */}
            <div>
              <Link to="/home">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-10 w-10 rounded-full bg-orange-400 p-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="ml-3 text-2xl font-bold">Uzumaki Draw</span>
                </div>
              </Link>
            </div>
          </Link>
        </div>
        {authState.user && (
          <div className="flex">
            <img className="h-10 w-10 rounded-full" src={authState.user?.photoURL as string} alt="" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
