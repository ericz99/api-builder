/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClipboard } from "@fortawesome/free-solid-svg-icons";

import { Divider } from ".";
import createModel from "../utils/createModel";

export default function SubSideBar({
  selectedApi,
  removeModel,
  setActiveModel,
  activeModel,
}) {
  const keys = Object.keys(selectedApi?.models || {}) || [];

  useEffect(() => {
    if (selectedApi) {
      setActiveModel("");
    }
  }, [selectedApi]);

  return (
    <div
      className="w-1/6 h-full flex flex-col"
      style={{ backgroundColor: "#3C415C" }}
    >
      <div className="p-4">
        <button
          type="submit"
          className="w-full h-12 bg-green-400 text-white rounded"
          onClick={() => setActiveModel("")}
        >
          Create New Model
        </button>
      </div>
      <Divider isVertical={false} />

      <ul className="w-full flex flex-col p-4">
        {keys.length > 0 ? (
          keys.map((key, i) => (
            <li
              key={i}
              onClick={() => setActiveModel(key)}
              className={`mb-2 p-4 text-white cursor-pointer flex items-center ${
                activeModel === key ? "bg-blue-500" : "bg-gray-500"
              }`}
            >
              <p className="flex-1">{key}</p>
              <div>
                <button
                  type="button"
                  className="ml-2 h-8 w-8 bg-blue-400 text-white rounded"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      createModel(selectedApi.models[activeModel], activeModel)
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faClipboard} />
                </button>
                <button
                  type="button"
                  className="ml-2 h-8 w-8 bg-red-400 text-white rounded"
                  onClick={() => {
                    removeModel({
                      modelName: key,
                      selectedApi: selectedApi.apiName,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-3xl">No Models Found ({keys.length})</p>
          </div>
        )}
      </ul>
    </div>
  );
}
