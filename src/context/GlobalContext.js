import { createContext } from "react";

export default createContext({
  selectedApi: {},
  apiList: {},
  createApi: (data) => {},
  removeApi: (data) => {},
  createModel: (data) => {},
  removeModel: (data) => {},
  updateModel: (data) => {},
  viewApi: (data) => {},
});
