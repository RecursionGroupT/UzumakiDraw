import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";
// import useLogin from "../hooks/useLogin";

const HomePage = () => {
  // const { googleLogin } = useLogin();
  const { authState, dispatch } = useContext(AuthContext);

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="flex space-x-12 border-t-2 border-double border-orange-300 px-12">
      {/* <div> */}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      {/* <button type="button" onClick={googleLogin}>
          Login
        </button> */}
      {/* </div> */}

      <div className="mt-12 w-2/3 bg-white p-40" />
      <div className="border-l-2 border-double border-orange-300" />
      <div className="mt-12 w-1/3 space-y-4">
        <input type="text" defaultValue="検索キーワード" className="w-full rounded-full bg-white p-4" />

        <div className="w-full rounded-2xl bg-white">
          <h1 className="cursor-default p-4 text-2xl font-bold tracking-wide">{authState.user?.displayName}</h1>

          <div className="m-auto h-32 w-32 bg-blue-200">自分の偏愛マップ</div>

          <button className="w-full rounded-lg p-4 text-left transition duration-300 hover:bg-gray-100" type="button">
            編集
          </button>

          <Link to="/game">
            <div className="rounded-lg p-4 transition duration-300 hover:bg-gray-100">
              <button type="button">start game</button>
            </div>
          </Link>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button
            className="w-full rounded-lg p-4 text-red-600 transition duration-300 hover:bg-gray-100"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
