import { Modal } from "antd";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getAllDepartments } from "../../../services/operations/departmentAPI";
import {
  editEmployee,
  getAllEmployees,
  fetchSortedData
} from "../../../services/operations/employeeAPI";

export default function Employees() {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  //for sorting 
  const [sortingOption, setSortingOption] = useState("Name"); // Default sorting option
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    console.log(employees)
    const fetchEmployees = async () => {
      const result = await dispatch(getAllEmployees());
      if (result) {
        setEmployees(result);
      }
    };

    const fetchDepartments = async () => {
      setDepartments(await dispatch(getAllDepartments()));
    };

    fetchEmployees();
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //edit dept
  const handleEdit = (employeeId, selectedDepartment) => {
    editEmployee(employeeId, selectedDepartment)
    //dispatch(editEmployee(employeeId, selectedDepartment));
  };

  const handleDepartmentChange = (index, selectedDepartment) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].department = selectedDepartment;
    setEmployees(updatedEmployees);
  };

  //handle ascending and decending order
  const toggleSortOrder = async () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setButtonClicked(true);
    try {
      const data = await fetchSortedData({
        sortingOption: sortingOption,
        sortOrder: sortOrder
      });

      setEmployees(data.employees)
      let message = `Sorted with ${sortingOption} in ${sortOrder} order`
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });

    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  //handle sorting by name and location
  const handlesorting = async (value) => {
    setSortingOption(value)

    try {
      const data = await fetchSortedData({
        sortingOption: sortingOption,
        sortOrder: sortOrder
      });

      setEmployees(data.employees)
      let message = `Sorted with ${sortingOption} in ${sortOrder} order`
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  }




  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center self-end mb-4">
        <select
          className="border-2 border-black p-1 rounded-md"
          onChange={(e) => handlesorting(e.target.value)}
        >
          <option value="Name">Sort By Name</option>
          <option value="Location">Sort By Location</option>
        </select>
        <MdArrowUpward
          className={`text-xl ${sortOrder === "asc" ? "text-red-500" : ""}`}
          onClick={toggleSortOrder}
        />
        <MdArrowDownward
          className={`text-xl ${sortOrder === "desc" ? "text-red-500" : ""}`}
          onClick={toggleSortOrder}
        />

      </div>
      <table className="w-full py-[10px]">
        <thead>
          <tr className="text-white">
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Name
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Email
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Location
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Department
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <React.Fragment key={index}>
                <tr className="">
                  <td className="border-b-2 border-black text-center h-16">
                    <p>
                      {employee?.FirstName} {employee?.LastName}
                    </p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{employee?.Email}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{employee?.Location}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <select
                      className="outline-none p-1 rounded-md "
                      value={employee?.department}
                      onChange={(e) => {
                        const selectedDepartment = e.target.value;
                        handleDepartmentChange(index, selectedDepartment);
                      }}
                    >
                      <option value="" >
                        {employee.department ? employee.department.name : "No Department"}
                      </option>
                      {departments.map((item, index) => (
                        <option
                          key={index}
                          value={item?.name}
                          className="text-center w-fit"
                        >
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="px-4 py-1 bg-custom-gradient text-white rounded-md"
                      onClick={() => handleEdit(employee._id, employee.department)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Employee available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
