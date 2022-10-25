// import { signOut } from "firebase/auth";
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { auth } from "../firebase/config";
import useLogin from "../hooks/useLogin";

const LandingPage = () => {
  const { googleLogin } = useLogin();
  // const { authState, dispatch } = useContext(AuthContext);

  // const logout = async () => {
  //   await signOut(auth);
  //   dispatch({ type: "LOGOUT" });
  // };

  return (
    <div>
      <div className="bg-orange-50 py-40">
        <div className="flex flex-col items-center space-y-16">
          <h1 className="text-3xl font-semibold tracking-wider">uzumakidraw</h1>
          <p className="text-5xl font-bold">
            ゲーム感覚で自分の<span className="bg-blue-300 p-2">偏愛マップ</span>を作ろう！
          </p>
          <button
            className="m-4 rounded-xl bg-gray-900 py-6 px-10 text-xl font-semibold tracking-wider text-white "
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={googleLogin}
          >
            GOOGLEでサインイン
          </button>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          {/* <button type="button" onClick={logout}>
          Logout
        </button>
        <br />
        <h1>{authState.user?.displayName}</h1>
        <img src={authState.user?.photoURL as string} alt="" /> */}
        </div>
      </div>
      <div className="flex justify-between space-x-8 p-28">
        <div className="flex flex-col space-y-8">
          <h1 className="text-5xl font-bold">偏愛マップとは？</h1>
          <p className="text-lg italic">
            苦手な人とも会話がはずみ、話したことのなかった人同士でも楽しく話題を共有できる一緒のコミュニケーション・ツールです。
          </p>
        </div>
        <div className="h-96 w-3/4 bg-white" />
      </div>
    </div>
  );
};

export default LandingPage;
