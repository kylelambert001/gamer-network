import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import modalReducer from "../reducers/modalReducer";
import alertReducer from "../reducers/alertReducer";
import profileReducer from "../reducers/profileReducer";
import postReducer from "../reducers/postReducer";
import createPostReducer from "../reducers/createPostReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  alert: alertReducer,
  profile: profileReducer,
  post: postReducer,
  createPost: createPostReducer,
});

export default rootReducer;
