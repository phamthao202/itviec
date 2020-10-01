import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import jobReducer from "../reducer/jobReducer";
import reducer from "../reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
