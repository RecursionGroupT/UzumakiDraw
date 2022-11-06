import { signOut } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";
import useGetUserDoc from "../hooks/useGetUserDoc";
import UserCard from "../components/HomePage/UserCard";
import useGetUsersDocs from "../hooks/useGetUsersDocs";
import useDeleteUserDoc from "../hooks/useDeleteUserDoc";
import { Modal } from "../components/Modal";
import { KonvaContext } from "../context/KonvaContext";
import { UserDoc } from "../firebase/types";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const HomePage = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const { setDrawings } = useContext(KonvaContext);
  const navigate = useNavigate();
  const { userDoc, setUserDoc } = useGetUserDoc();
  const { userDocs, isLoading } = useGetUsersDocs();
  const { deleteUserDoc } = useDeleteUserDoc();

  const [showStartGameModal, setShowStartGameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUserCardModal, setShowUserCardModal] = useState(false);
  const [currUserCard, setCurrUserCard] = useState<UserDoc | null>(null);

  useEffect(() => {
    setDrawings([]);
  }, [setDrawings]);

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
          </div>
        ) : (
          <div className="mx-12 flex space-x-20 border-t-2 border-double border-orange-300 px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={list}
              className="mt-12 grid w-2/3 grid-cols-2 flex-wrap justify-around"
            >
              {userDocs.map((currDoc) => (
                <UserCard
                  onClick={() => {
                    setCurrUserCard(currDoc);
                    setShowUserCardModal(true);
                  }}
                  userDoc={currDoc}
                />
              ))}
            </motion.div>
            <div className="border-l-2 border-double border-orange-300" />
            <div className="mt-12 w-1/3 space-y-4">
              <div className="flex flex-col justify-center rounded-2xl bg-white">
                <h1 className="cursor-default p-4 text-center text-2xl font-bold tracking-wide">
                  {authState.user?.displayName}
                </h1>
                {userDoc && <img className="m-auto" width={300} height={300} src={userDoc.dataURL as string} alt="" />}
                <div className="flex flex-col justify-center">
                  <motion.button
                    onClick={() => setShowStartGameModal(true)}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="mx-2 my-5 flex items-center justify-center rounded-lg bg-blue-400 p-5 text-xl font-bold text-black shadow-md"
                  >
                    Start Game
                  </motion.button>
                  {userDoc && (
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="mx-2 mb-5 flex items-center justify-center rounded-lg bg-red-400 px-5 py-2 text-xl font-bold text-black shadow-md"
                      type="button"
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={() => {
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </motion.button>
                  )}
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
        )}
      </div>
      <Modal isOpen={showStartGameModal} handleClose={() => setShowStartGameModal(false)}>
        <div className="w-96">
          <h1 className="text-center text-2xl font-bold">Are you sure you want to start?</h1>
          <p className="text-center font-bold text-red-400">Data previously saved will be deleted!</p>
          <motion.button
            onClick={() => navigate("/game")}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="mx-auto my-5 flex w-full items-center justify-center rounded-lg bg-blue-400 p-5 text-xl font-bold text-black shadow-md"
          >
            Start Game
          </motion.button>
        </div>
      </Modal>
      <Modal isOpen={showDeleteModal} handleClose={() => setShowDeleteModal(false)}>
        <div className="w-96">
          <h1 className="text-center text-2xl font-bold text-red-400">Are you sure you want to delete?</h1>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="mx-auto my-5 flex w-full items-center justify-center rounded-lg bg-red-400 p-5 text-xl font-bold text-black shadow-md"
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => {
              setUserDoc(null);
              deleteUserDoc().catch((err) => console.log(err));
              setShowDeleteModal(false);
            }}
          >
            Delete
          </motion.button>
        </div>
      </Modal>
      <Modal isOpen={showUserCardModal} handleClose={() => setShowUserCardModal(false)}>
        <div>
          <h1 className="text-center text-2xl font-bold text-black">{currUserCard?.name}</h1>
          <img
            className="mx-auto p-4"
            width={700}
            height={700}
            alt="imageDataURL"
            src={currUserCard?.dataURL as string}
          />
        </div>
      </Modal>
    </>
  );
};

export default HomePage;
