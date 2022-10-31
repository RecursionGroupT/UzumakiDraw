import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { motion } from "framer-motion";
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
      <div className="mt-12 w-2/3 bg-white p-40" />
      <div className="border-l-2 border-double border-orange-300" />
      <div className="mt-12 w-1/3 space-y-4">
        <input type="text" defaultValue="検索キーワード" className="w-full rounded-full bg-white p-4" />

        <div className="rounded-2xl bg-white">
          <h1 className="cursor-default p-4 text-2xl font-bold tracking-wide">{authState.user?.displayName}</h1>
          <div className="m-auto h-32 w-32 bg-orange-200">自分の偏愛マップ</div>
          <div className="flex flex-col justify-center">
            <button className="rounded-lg p-4 transition duration-300 hover:bg-gray-100" type="button">
              編集
            </button>
            <Link to="/game">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="flex items-center justify-center rounded-lg bg-green-400 p-5 text-xl font-bold text-black shadow-md"
              >
                Start Game
              </motion.button>
            </Link>
            <button
              className="rounded-lg p-4 text-red-600 transition duration-300 hover:bg-gray-100"
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
