import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";
import useGetUserDoc from "../hooks/useGetUserDoc";
import UserCard from "../components/HomePage/UserCard";
import useGetUsersDocs from "../hooks/useGetUsersDocs";

const HomePage = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userDoc } = useGetUserDoc();
  const { userDocs } = useGetUsersDocs();

  console.log(userDocs);

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="flex space-x-12 border-t-2 border-double border-orange-300 px-12">
      <div className="mt-12 flex w-2/3 flex-wrap justify-around">
        {userDocs.map((currDoc) => (
          <UserCard userDoc={currDoc} />
        ))}
      </div>
      <div className="border-l-2 border-double border-orange-300" />
      <div className="mt-12 w-1/3 space-y-4">
        <input type="text" defaultValue="検索キーワード" className="w-full rounded-full bg-white p-4" />

        <div className="flex flex-col justify-center rounded-2xl bg-white">
          <h1 className="cursor-default p-4 text-center text-2xl font-bold tracking-wide">
            {authState.user?.displayName}
          </h1>
          {userDoc && <img className="m-auto" width={300} height={300} src={userDoc.dataURL as string} alt="" />}
          <div className="flex flex-col justify-center">
            <motion.button
              onClick={() => navigate("/game")}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="mx-2 my-5 flex items-center justify-center rounded-lg bg-green-400 p-5 text-xl font-bold text-black shadow-md"
            >
              Start Game
            </motion.button>
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
