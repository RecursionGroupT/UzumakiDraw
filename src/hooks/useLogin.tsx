import { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/config";

const useLogin = () => {
  const { dispatch } = useContext(AuthContext);

  const googleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);

      if (res) {
        dispatch({ type: "LOGIN", payload: res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { googleLogin };
};

export default useLogin;
