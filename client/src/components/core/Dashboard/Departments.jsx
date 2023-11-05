import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditDepartment } from "../../../redux/slices/departmentSlice";
import {
  deleteDepartment,
  getAllDepartments,
} from "../../../services/operations/departmentAPI";

export default function Departments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepartments(await dispatch(getAllDepartments()));
    };
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (departmentId) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this department?",
      onOk() {
        dispatch(deleteDepartment(departmentId));
        setDepartments(departments.filter((item) => item._id !== departmentId));
      },
      okButtonProps: {
        className: "bg-custom-gradient",
      },
    });
  };

  const handleEdit = (departmentId) => {
    navigate(`/dashboard/edit-department/${departmentId}`);
  };

  return (
    <div>
      <table className="w-full py-[10px]">
        <thead>
          <tr className="text-white">
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Department Name
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] ">
              Employee Count
            </th>
            <th className="py-[1.4em] px-[0.75em] text-center bg-[#4066ff] border border-[#fff] "></th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((department, index) => (
              <React.Fragment key={index}>
                <tr className="">
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{department?.name}</p>
                  </td>
                  <td className="border-b-2 border-black text-center h-16">
                    <p>{department?.employeeCount}</p>
                  </td>

                  <td className="border-b-2 border-black flex items-center text-center justify-center h-16 ">
                    <MdEdit
                      className="text-[46px] px-[10px] cursor-pointer"
                      onClick={() => handleEdit(department?._id)}
                    />
                    <MdDelete
                      className="text-[46px] px-[10px] text-red-700 cursor-pointer"
                      onClick={() => {
                        handleDelete(department?._id);
                      }}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">No department available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
