import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import modalReducer from "../reducers/modalReducer";
import alertReducer from "../reducers/alertReducer";
import profileReducer from "../reducers/profileReducer";
import postReducer from "../reducers/postReducer";
import commentReducer from "../reducers/commentReducer";
import likeReducer from "../reducers/likeReducer";
import accountReducer from "../reducers/accountReducer";

const rootReducer = combineReducers({
  authReducer,
  modalReducer,
  alertReducer,
  profileReducer,
  postReducer,
  commentReducer,
  likeReducer,
  accountReducer,
});

export default rootReducer;
