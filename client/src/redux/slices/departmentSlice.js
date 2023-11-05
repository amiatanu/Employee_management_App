import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editDepartment: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setEditDepartment: (state, action) => {
      state.editDepartment = action.payload;
    },
  },
});

export const { setEditDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;
