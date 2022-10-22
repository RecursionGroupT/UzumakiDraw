import React, { useState } from "react";

const data: string[] = ["自己紹介を書いてください", "主題１", "主題２", "主題３", "主題４", "主題５"];

const SubjectDisplay = () => {
  const [subjectArray, setSubjectArray] = useState<string[]>(data);
  const [subject, setSubject] = useState<string>(data[0]);

  const handleClick = () => {
    if (subjectArray.length > 1) {
      setSubjectArray((prevSubjectArray) => {
        const newSubjectArray = [...prevSubjectArray];
        newSubjectArray.splice(subjectArray.indexOf(subject), 1);

        const randomNum: number = Math.floor(Math.random() * newSubjectArray.length);
        setSubject(newSubjectArray[randomNum]);

        return newSubjectArray;
      });
    }
    // 次のページにいく処理
  };

  return (
    <div className=" rounded-t-md border-4 border-black bg-gray-900 p-6 text-center text-xl font-bold text-white">
      <div>
        {subject}
        <button type="button" onClick={handleClick}>
          完了
        </button>
      </div>
    </div>
  );
};

export default SubjectDisplay;
