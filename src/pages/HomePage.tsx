import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";
import useLogin from "../hooks/useLogin";

const HomePage = () => {
  const { googleLogin } = useLogin();
  const { authState, dispatch } = useContext(AuthContext);

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      HomePage
      <div>
        <button className="bg-blue-800 hover:bg-blue-600 text-white rounded px-4 py-2" type="button">
          <Link to="/game">to game</Link>
        </button>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button type="button" onClick={googleLogin}>
          Login
        </button>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button type="button" onClick={logout}>
          Logout
        </button>
        <br />
        <h1>{authState.user?.displayName}</h1>
        <img src={authState.user?.photoURL as string} alt="" />
      </div>
    </div>
  );
};

export default HomePage;
