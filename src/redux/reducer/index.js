import { combineReducers } from "redux";
import authReducer from "./authReducer";
import jobReducer from "./jobReducer";

export default combineReducers({
  job: jobReducer,
  auth: authReducer,
});
