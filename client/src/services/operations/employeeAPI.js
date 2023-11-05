import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/authSlice";
import { employeeEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

const { ALL_EMPLOYEE_API, EDIT_EMPLOYEE_API, DELETE_EMPLOYEE_API } =
  employeeEndPoints;

export function getAllEmployees() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      //dispatch(setLoading(true));
      const response = await apiConnector(
        `GET`,
        ALL_EMPLOYEE_API,
        {},
        {
          authorization: "Bearer " + token,
        }
      );
      // dispatch(setLoading(false));
      return response?.data?.employees;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log(error);
    }
  };
}

export function editEmployee(_id, department, navigate) {
  const data = { _id: _id, department: department };

  const url = "http://localhost:5000/api/employee/edit-employee";
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard/employees");
      // console.log(data);
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);
    });

  /*  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setLoading(true));
      const response = await apiConnector(`POST`, EDIT_EMPLOYEE_API, data, {
        authorization: token,
      });
      dispatch(setLoading(false));

      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard/employees");
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
  }; */
}

export async function fetchSortedData(parameters) {
  const url = "http://localhost:5000/api/employee/sort-employee";
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(parameters),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    /* toast.success(data.message, {
      position: toast.POSITION.TOP_CENTER,
    }); */
    // navigate("/dashboard/employees");
    return data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    throw error; // Throw the error to indicate failure
  }
}
