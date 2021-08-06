/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_API,
  CREATE_MODEL,
  REMOVE_API,
  REMOVE_MODEL,
  VIEW_API,
  VIEW_API_LIST,
} from "./types";

const createApi = (state, data) => {
  const apiList = { ...state.apiList };
  apiList[data] = {
    apiName: data,
  };
  return { ...state, apiList };
};

const removeApi = (state, data) => {
  const apiList = { ...state.apiList };

  for (const key of Object.keys(apiList)) {
    if (key === data) {
      delete apiList[key];
    }
  }

  return { ...state, apiList };
};

const createModel = (state, data) => {
  const apiList = { ...state.apiList };

  for (const key of Object.keys(apiList)) {
    if (key === data.selectedApi) {
      apiList[key] = {
        ...apiList[key],
        models: {
          ...apiList[key].models,
          [data.modelName]: [...data.schemas],
        },
      };
    }
  }

  return { ...state, apiList, selectedApi: apiList[data.selectedApi] };
};

const removeModel = (state, data) => {
  const apiList = { ...state.apiList };

  for (const key of Object.keys(apiList)) {
    if (key === data.selectedApi) {
      // # delete the model in the models obj
      delete apiList[key].models[data.modelName];
    }
  }

  return { ...state, apiList, selectedApi: apiList[data.selectedApi] };
};

export default (state, action) => {
  switch (action.type) {
    case CREATE_API:
      return createApi(state, action.payload);
    case REMOVE_API:
      return removeApi(state, action.payload);
    case CREATE_MODEL:
      return createModel(state, action.payload);
    case REMOVE_MODEL:
      return removeModel(state, action.payload);
    case VIEW_API_LIST:
      return {
        ...state,
        apiList: state.apiList,
      };
    case VIEW_API:
      return {
        ...state,
        selectedApi: state.apiList[action.payload],
      };
    default:
      return state;
  }
};
