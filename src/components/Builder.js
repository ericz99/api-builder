/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SchemaField from "../utils/schemaField";

export default function Builder({ selectedApi, createModel, activeModel }) {
  const [modelName, setModelName] = useState("");
  const [formData, setFormData] = useState({});
  const [schemas, setSchemas] = useState([]);
  const [disableModelName, setDisableName] = useState(false);

  useEffect(() => {
    if (activeModel !== "") {
      if (!!selectedApi?.models[activeModel]) {
        const models = selectedApi.models[activeModel];

        if (schemas.length > 0) {
          setSchemas([]);
        }

        setSchemas(models);
        // # set model name
        setModelName(activeModel);
        setDisableName(true);
      }
    } else {
      resetForm();
    }
  }, [activeModel, selectedApi]);

  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      for (const key of Object.keys(SchemaField)) {
        const isSelectInput =
          SchemaField[key].input === "select" ? true : false;

        setFormData((prev) => ({
          ...prev,
          [key]: isSelectInput ? SchemaField[key].options[0] : "",
        }));
      }
    }
  }, [formData]);

  const resetForm = () => {
    setSchemas([]);
    setFormData({});
    setModelName("");
    setDisableName(false);
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addModelSchema = () => {
    setSchemas([...schemas, formData]);
    setFormData({});
  };

  const fieldKey = Object.keys(SchemaField);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 font-medium">Builder</h1>

      <div className="flex flex-col my-2">
        <form
          className="flex flex-col w-full mt-2 p-6 rounded"
          style={{ backgroundColor: "#2C2E43" }}
          onSubmit={(e) => {
            e.preventDefault();
            // # add model + schema
            createModel({
              schemas: schemas,
              modelName: modelName,
              selectedApi: selectedApi.apiName,
            });
            // # clear schema field
            setSchemas([]);
            setFormData({});
            setModelName(null);
          }}
        >
          <div className="flex-1 flex flex-col items-start mb-4">
            <label className="mr-2 mb-2 text-white text-sm">Model Name</label>
            <input
              type="text"
              name="modelName"
              onChange={(e) => setModelName(e.target.value)}
              value={modelName}
              placeholder="Model Name"
              className="w-1/4 p-1 border border-black rounded text-black"
              disabled={disableModelName}
              required
            />
          </div>

          <div className="flex items-end mb-2">
            {fieldKey.map((key, i) => {
              if (SchemaField[key].input === "input") {
                return (
                  <div className="flex-1 flex flex-col mr-2" key={i}>
                    <label className="mb-2 text-white text-sm">
                      {SchemaField[key].name}
                    </label>
                    <input
                      type="text"
                      name={key}
                      onChange={onChange}
                      value={formData[key] || ""}
                      className="p-1 border border-black rounded text-black"
                      required={SchemaField[key].requred}
                    />
                  </div>
                );
              }

              if (SchemaField[key].input === "select") {
                return (
                  <div className="flex-1 flex flex-col mr-2" key={i}>
                    <label className="mb-2 text-white text-sm">
                      {SchemaField[key].name}
                    </label>
                    <select
                      name={key}
                      onChange={onChange}
                      value={formData[key] || SchemaField[key].options[0]}
                      className="p-1 border border-black rounded text-black"
                    >
                      {SchemaField[key]?.options.map((option, j) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
            })}

            <button
              type="button"
              onClick={addModelSchema}
              className="ml-2 h-8 w-8 bg-green-400 text-white rounded"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <ul className="flex flex-col mb-2 overflow-y-scroll h-52">
            {schemas.length > 0 &&
              schemas.map((schema, i) => (
                <li className="flex items-start my-4" key={i}>
                  {fieldKey.map((key, j) => (
                    <div className="flex-1 flex flex-col mr-2" key={j}>
                      <p className="text-white">{schema[key] || "Null"}</p>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="ml-2 h-8 w-8 bg-red-400 text-white rounded"
                    onClick={() => {
                      const clone = [...schemas];
                      const newFiltered = clone.filter((_, k) => k !== i);
                      setSchemas(newFiltered);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </li>
              ))}
          </ul>

          <div className="flex flex-col w-full">
            <div className="flex">
              <button
                type="submit"
                className="flex-1 h-12 bg-blue-400 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
