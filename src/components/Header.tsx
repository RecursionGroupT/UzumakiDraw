import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";

const Header = () => {
  const { authState, dispatch } = useContext(AuthContext);

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };
  return (
    <header className="">
      <div className="flex justify-between p-6">
        <div>
          <Link to="/">
            <div className="flex items-center border-4 border-gray-900 bg-orange-400 px-8 py-2 font-semibold tracking-tighter transition duration-300 hover:bg-gray-900 hover:text-white md:mb-0 ">
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
            </div>
          </Link>
        </div>
        <div className="flex">
          <img
            className="h-10 w-10 rounded-full border-4 border-black"
            src={authState.user?.photoURL as string}
            alt=""
          />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button className="rounded-xl bg-blue-800 px-4 text-white hover:bg-blue-600" type="button" onClick={logout}>
            Logout
          </button>
          <button className="rounded-xl bg-blue-800 px-4 text-white hover:bg-blue-600" type="button">
            <Link to="/home">to home</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
