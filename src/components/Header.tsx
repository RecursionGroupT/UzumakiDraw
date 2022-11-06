import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GiShurikenAperture } from "react-icons/gi";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { authState } = useContext(AuthContext);

  return (
    <header>
      <div className="flex items-center justify-between p-5">
        <Link to="/home">
          <div className="flex items-center">
            <GiShurikenAperture />
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
