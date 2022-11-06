import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { UserDoc } from "../firebase/types";

const useGetUsersDocs = () => {
  const [userDocs, setUserDocs] = useState<UserDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const ref = collection(db, "users");
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const res: UserDoc[] = [];
        snapshot.docs.forEach((doc) => {
          res.push(doc.data() as UserDoc);
        });
        setUserDocs(res);
        setIsLoading(false);
      },
      (err) => {
        console.log(err);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { userDocs, isLoading };
};

export default useGetUsersDocs;
