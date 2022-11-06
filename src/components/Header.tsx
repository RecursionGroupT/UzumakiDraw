import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { authState } = useContext(AuthContext);

  return (
    <header>
      <div className="flex items-center justify-between p-5">
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
