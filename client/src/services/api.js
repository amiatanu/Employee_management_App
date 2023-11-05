const BASE_URL = `http://localhost:5000/api`;

// Auth Endpoints
export const authEndpoints = {
  SIGN_UP: BASE_URL + `/auth/register`,
  LOGIN: BASE_URL + `/auth/login`,
  USER_INFO: BASE_URL + `/auth/user-info`,
};

//Categories Endpoints
export const departmentEndPoints = {
  ALL_DEPARTMENT_API: BASE_URL + "/department/show-all-departments",
  GET_DEPARTMENT_API: BASE_URL + "/department/get-department-info",
  CREATE_DEPARTMENT_API: BASE_URL + "/department/create-department",
  EDIT_DEPARTMENT_API: BASE_URL + "/department/edit-department",
  DELETE_DEPARTMENT_API: BASE_URL + "/department/delete-department",
};

export const employeeEndPoints = {
  ALL_EMPLOYEE_API: BASE_URL + "/employee/show-all-employees",
  EDIT_EMPLOYEE_API: BASE_URL + "/employee/edit-employee",
};
