import React, { useState, useEffect } from "react";

import { Divider } from ".";

export default function MainSideBar({
  apiList,
  openModal,
  setSelectedApi,
  selectedApi,
  setActiveModel,
}) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    const keys = Object.keys(apiList);
    setLength(keys.length);
  }, [apiList]);

  const keys = Object.keys(apiList);

  return (
    <div
      className="w-1/5 h-full flex flex-col"
      style={{ backgroundColor: "#2C2E43" }}
    >
      <div className="mb-2 p-4">
        <p className="text-white text-4xl flex flex-col">
          Web Api Builder
          <span className="text-sm my-2">in Node.js</span>
        </p>
      </div>

      <div className="p-4">
        <button
          type="submit"
          className="w-full h-12 bg-green-400 text-white rounded"
          onClick={openModal}
        >
          Create New Api
        </button>
      </div>

      <Divider isVertical={false} />

      <ul className="w-full flex flex-col p-4 h-full">
        {keys.length > 0 ? (
          keys.map((key, i) => (
            <li
              key={i}
              className={`mb-2 p-4 text-white bg-gray-500 text-center cursor-pointer ${
                selectedApi.apiName === key ? "bg-blue-300" : "bg-gray-300"
              }`}
              onClick={() => {
                setSelectedApi(key);
                setActiveModel("");
              }}
            >
              {key}
            </li>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-3xl">No API's Found ({length})</p>
          </div>
        )}
      </ul>
    </div>
  );
}
