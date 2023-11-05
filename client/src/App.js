import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Spinner from "./components/common/Spinner";
import AddDepartment from "./components/core/Dashboard/AddDepartment";
import Departments from "./components/core/Dashboard/Departments";
import EditDepartment from "./components/core/Dashboard/EditDepartment";
import Employees from "./components/core/Dashboard/Employees";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getUserInfo } from "./services/operations/authAPI";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;
  else
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<Dashboard />}>
            <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
            <Route path="/dashboard/employees" element={<Employees />}></Route>
            {user?.Role === "Manager" && (
              <Route
                path="/dashboard/departments"
                element={<Departments />}
              ></Route>
            )}
            {user?.Role === "Manager" && (
              <Route
                path="/dashboard/add-department"
                element={<AddDepartment />}
              ></Route>
            )}

            {user?.Role === "Manager" && (
              <Route
                path="/dashboard/edit-department/:departmentId"
                element={<EditDepartment />}
              ></Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
