import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/authSlice.js";
import { departmentEndPoints } from "../api.js";
import { apiConnector } from "../apiConnector.js";

const {
  ALL_DEPARTMENT_API,
  GET_DEPARTMENT_API,
  CREATE_DEPARTMENT_API,
  EDIT_DEPARTMENT_API,
  DELETE_DEPARTMENT_API,
} = departmentEndPoints;

export function getAllDepartments() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiConnector(
        `GET`,
        ALL_DEPARTMENT_API,
        {},
        {
          authorization: "Bearer " + token,
        }
      );
      return response?.data?.departments;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDepartmentInfo(departmentId) {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiConnector(
        `GET`,
        GET_DEPARTMENT_API + "/" + departmentId,
        {},
        {
          authorization: "Bearer " + token,
        }
      );
      return response?.data?.department;
    } catch (error) {
      console.log(error);
    }
  };
}

export function createDepartment(data, navigate) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setLoading(true));
      const response = await apiConnector(`POST`, CREATE_DEPARTMENT_API, data, {
        authorization: "Bearer " + token,
      });
      dispatch(setLoading(false));

      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard/departments");
    } catch (error) {
      dispatch(setLoading(false));
      if (error?.response) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
}

export function editDepartment(data, navigate) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setLoading(true));
      const response = await apiConnector(
        `POST`,
        EDIT_DEPARTMENT_API + "/" + data?.departmentId,
        data,
        {
          authorization: "Bearer " + token,
        }
      );
      dispatch(setLoading(false));

      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard/departments");
    } catch (error) {
      dispatch(setLoading(false));
      if (error?.response) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
}

export function deleteDepartment(departmentId) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setLoading(true));
      const response = await apiConnector(
        `DELETE`,
        DELETE_DEPARTMENT_API + "/" + departmentId,
        {},
        {
          authorization: "Bearer " + token,
        }
      );
      dispatch(setLoading(false));

      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(setLoading(false));
      if (error?.response) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
}
