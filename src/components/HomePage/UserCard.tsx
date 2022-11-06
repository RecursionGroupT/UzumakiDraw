import React from "react";
import { UserDoc } from "../../firebase/types";

type Props = {
  userDoc: UserDoc;
};

const UserCard: React.FC<Props> = ({ userDoc }) => (
  <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{userDoc.name}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{userDoc.createdAt.toDate().toString()}</p>
    {userDoc.dataURL && <img className="m-auto py-5" src={userDoc.dataURL} alt="" />}
  </div>
);

export default UserCard;
