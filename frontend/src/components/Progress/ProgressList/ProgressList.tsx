import React from "react";
import dummy from "../DummyData/ProgressList.json";

type Tale = {
  id: number;
  title: string;
  backgroundImage: string;
  progress: number;
  correctWordCount: number;
  totalWordCount: number;
};

type TaleProps = {
  tale: Tale;
};

function ProgressList({ tale }: TaleProps) {
  const testCount = (tale.correctWordCount / tale.totalWordCount) * 100;
  return (
    <div className=" border-2 border-orange-300 rounded-lg py-2 px-2">
      <img className="w-full" src={tale.backgroundImage} />{" "}
      <div>{tale.title}</div>
      <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 rounded-full dark:bg-green-500"
          style={{ width: `${tale.progress}%` }}
        >
          {tale.progress}%
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 rounded-full dark:bg-green-500"
          style={{ width: `${testCount}%` }}
        >
          {tale.correctWordCount}/{tale.totalWordCount}
        </div>
      </div>
    </div>
  );
}

export default ProgressList;
