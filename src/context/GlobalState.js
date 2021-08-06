import React, { useReducer } from "react";

import GlobalContext from "./GlobalContext";
import reducer from "./reducer";
import * as T from "./types";

export default function GlobalState({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    apiList: {},
    selectedApi: {},
  });

  const createApi = (data) => {
    dispatch({
      type: T.CREATE_API,
      payload: data,
    });
  };

  const removeApi = (data) => {
    dispatch({
      type: T.REMOVE_API,
      payload: data,
    });
  };

  const createModel = (data) => {
    dispatch({
      type: T.CREATE_MODEL,
      payload: data,
    });
  };

  const updateModel = (data) => {
    dispatch({
      type: T.UPDATE_MODEL,
      payload: data,
    });
  };

  const removeModel = (data) => {
    dispatch({
      type: T.REMOVE_MODEL,
      payload: data,
    });
  };

  const viewApi = (data) => {
    dispatch({
      type: T.VIEW_API,
      payload: data,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        apiList: state.apiList,
        selectedApi: state.selectedApi,
        createApi: createApi,
        removeApi: removeApi,
        createModel: createModel,
        removeModel: removeModel,
        updateModel: updateModel,
        viewApi: viewApi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
