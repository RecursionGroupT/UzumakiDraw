import { useContext } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/config";

const useDeleteUserDoc = () => {
  const { authState } = useContext(AuthContext);

  const deleteUserDoc = async () => {
    try {
      if (authState.user) {
        await deleteDoc(doc(db, "users", authState.user.uid));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteUserDoc };
};

export default useDeleteUserDoc;
