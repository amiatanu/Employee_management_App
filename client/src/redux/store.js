import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import departmentSlice from "./slices/departmentSlice";
import profileSlice from "./slices/profileSlice";

export default combineReducers({
  auth: authSlice,
  profile: profileSlice,
  department: departmentSlice,
});
