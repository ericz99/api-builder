import React, { useState, useRef } from "react";

import DropDown from "./DropDown";

import {
  generateGetEndpoint,
  generatePostEndpoint,
  generateDeleteEndpoint,
  generatePutEndpoint,
} from "../utils/createEndpoint";

const mapping = {
  READ: generateGetEndpoint,
  CREATE: generatePostEndpoint,
  DELETE: generateDeleteEndpoint,
  UPDATE: generatePutEndpoint,
};

const keys = Object.keys(mapping);

export default function CodeOutput({ activeModel, selectedApi }) {
  const $outputRef = useRef();
  const [selected, setSelected] = useState("READ");
  const [isToggle, setToggle] = useState(false);

  const modelMapper = (modelName, schemas) => {
    return schemas.map((schema) => {
      let str = `${schema.propertyName}: req.body.${modelName}.${schema.propertyName}, // Type: ${schema.type}, Array?: ${schema.array}, Required: ${schema.required}`;
      return str;
    });
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const copyCodeToClipboard = () => {
    const el = $outputRef.current;
    el.select();
    document.execCommand("copy");
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="mb-2 font-medium">Code Output</h1>
      {activeModel !== "" && (
        <div className="flex flex-col my-2 h-full relative">
          <div className="absolute top-0 right-0 text-black">
            <DropDown
              selected={selected}
              list={keys}
              isToggle={isToggle}
              handleChange={setSelected}
              handleToggle={setToggle}
            />
          </div>

          <div className="absolute bottom-0 right-0 text-black">
            <button
              type="button"
              className="bg-blue-500 py-2 px-4 text-white"
              onClick={copyCodeToClipboard}
            >
              Copy
            </button>
          </div>

          <textarea
            className="text-black h-full"
            wrap="off"
            readOnly="readonly"
            ref={$outputRef}
            value={mapping[selected]({
              capVersion: capitalize(activeModel),
              modelName: activeModel,
              modelMapper: modelMapper(
                activeModel,
                selectedApi?.models[activeModel]
              ),
            })}
          />
        </div>
      )}
    </div>
  );
}
