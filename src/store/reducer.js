import { combineReducers } from "redux";
import userSlice from "../slice/user";
import navSlice from "../slice/nav";
import pageSlice from "../slice/page";
const rootReducer = combineReducers({
  user: userSlice.reducer,
  nav: navSlice.reducer,
  page: pageSlice.reducer,
});

export default rootReducer;
