import { doc, getDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";
import { UserDoc } from "../firebase/types";

const useGetUserDoc = () => {
  const { authState } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserDoc = async () => {
      setIsLoading(true);
      try {
        if (authState.user) {
          const docRef = doc(db, "users", authState.user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) throw new Error("user data does not exist");
          const data = docSnap.data() as UserDoc;
          setUserDoc(data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    getUserDoc().catch((err) => console.log(err));
  }, [authState.user]);

  return { userDoc, setUserDoc, isLoading };
};

export default useGetUserDoc;
