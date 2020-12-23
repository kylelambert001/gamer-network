import { combineReducers } from "redux";

import authReducer from "../reducers/authReducer";
import modalReducer from "../reducers/modalReducer";
import alertReducer from "../reducers/alertReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  alert: alertReducer,
});

export default rootReducer;