import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice.js";
import { authEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { SIGN_UP, LOGIN, USER_INFO } = authEndpoints;

export function register(data, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector(`POST`, SIGN_UP, data);
      dispatch(setLoading(false));

      toast.info(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
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

export function login(data, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector(`POST`, LOGIN, data);
      dispatch(setLoading(false));

      toast.success(response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(setUser(response?.data?.user));
      localStorage.setItem("token", response?.data?.token);
      navigate("/dashboard/my-profile");
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

export function getUserInfo() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch(setLoading(true));
      const response = await apiConnector(
        `GET`,
        USER_INFO,
        {},
        {
          authorization: "Bearer " + token,
        }
      );
      dispatch(setLoading(false));
      dispatch(setUser(response?.data?.user));
    } catch (error) {
      dispatch(setLoading(false));
      localStorage.removeItem("token");
      console.log(error);
    }
  };
}
