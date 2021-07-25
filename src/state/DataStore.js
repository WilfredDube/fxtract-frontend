import { createStore } from "redux";
import { ProjectReducer } from "./ProjectReducer";

export const FxtractDataStore = createStore(
  ProjectReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
