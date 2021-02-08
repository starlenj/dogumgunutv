import { combineReducers } from "redux";
import UserReducer from "./User";
import DataTableReducer from "./DataTable";
import { reducer as FormReducer } from "redux-form";
const rootReducer = combineReducers({
  UserReducer,
  DataTableReducer,
  form: FormReducer,
});

export default rootReducer;
