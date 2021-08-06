import React, { useState, useContext } from "react";
import Rodal from "rodal";

import {
  Divider,
  MainSideBar,
  SubSideBar,
  Builder,
  CodeOutput,
} from "./components";

import GlobalContext from "./context/GlobalContext";

import "rodal/lib/rodal.css";

export default function App() {
  const context = useContext(GlobalContext);
  const [isVisible, setVisible] = useState(false);
  const [apiName, setApiName] = useState("");
  const [activeModel, setActiveModel] = useState("");

  const isSelected = () => {
    if (Object.keys(context.selectedApi).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <div
      className="h-full flex flex-row"
      style={{
        backgroundColor: "#0A1931",
        color: "#ffffff",
      }}
    >
      <MainSideBar
        apiList={context.apiList}
        openModal={() => setVisible(true)}
        setSelectedApi={context.viewApi}
        selectedApi={context.selectedApi}
        setActiveModel={setActiveModel}
      />

      {isSelected() ? (
        <>
          <SubSideBar
            selectedApi={context.selectedApi}
            removeModel={context.removeModel}
            setActiveModel={setActiveModel}
            activeModel={activeModel}
          />

          <div className="flex-1 flex flex-col">
            <div className="h-full flex-1 p-4">
              <div className="builder mb-2 h-full">
                <Builder
                  selectedApi={context.selectedApi}
                  createModel={context.createModel}
                  activeModel={activeModel}
                />
              </div>
            </div>

            <Divider isVertical={false} />

            <div className="h-full flex flex-col flex-1">
              <div className="code__output mb-2 flex-1 p-4">
                <CodeOutput
                  selectedApi={context.selectedApi}
                  activeModel={activeModel}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Rodal visible={isVisible} onClose={() => setVisible(false)} height={150}>
        <form
          className="h-full flex flex-col justify-end"
          onSubmit={(e) => {
            e.preventDefault();
            // # add api
            context.createApi(apiName);
            // # select api
            context.viewApi(apiName);
            // # clear model
            setActiveModel("");
            // # clear api name
            setApiName("");
            // # remove modal
            setVisible(false);
          }}
        >
          <label className="mb-2 text-black text-sm">Api Name</label>
          <input
            type="text"
            className="w-full p-1 border border-black rounded text-black"
            name="apiName"
            placeholder="Your API Name"
            onChange={(e) => setApiName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="h-8 w-full bg-green-400 text-white rounded mt-2"
          >
            Save
          </button>
        </form>
      </Rodal>
    </div>
  );
}
