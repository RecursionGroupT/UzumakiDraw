import { useContext, useState } from "react";
import { setDoc, Timestamp, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";
import { UserDoc } from "../firebase/types";

const useAddUserDoc = () => {
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const addUserDoc = async (dataURL: string, hashtags: string[]) => {
    setIsLoading(true);
    try {
      if (authState.user) {
        const payload: UserDoc = {
          name: authState.user.displayName,
          createdAt: Timestamp.now(),
          dataURL,
          hashtags,
        };
        const docRef = doc(db, "users", authState.user.uid);
        await setDoc(docRef, payload);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return { addUserDoc, isLoading };
};

export default useAddUserDoc;
