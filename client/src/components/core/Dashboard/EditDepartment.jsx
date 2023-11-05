import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editDepartment,
  getDepartmentInfo,
} from "../../../services/operations/departmentAPI";

export default function EditDepartment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState(false);
  const { departmentId } = useParams();

  const handleOnChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentName) {
      setError(true);
      return;
    }

    dispatch(editDepartment({ name: departmentName, departmentId }, navigate));
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      const department = await dispatch(getDepartmentInfo(departmentId));
      setDepartmentName(department?.name);
    };

    fetchDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className="space-y-8 rounded-md border-[1px] border-gray-700 p-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-2">
        <label
          className="text-sm text-black after:content-['*'] after:text-[#f00]"
          htmlFor="departmentName"
        >
          Department
        </label>
        <input
          id="departmentName"
          name="departmentName"
          value={departmentName}
          onChange={handleOnChange}
          placeholder="Enter Department Name"
          className="w-full bg-slate-300 h-[44px] rounded-md px-4 outline-none"
        />
        {error && (
          <span className="ml-2 text-xs tracking-wide text-[#f00]">
            Department Name is required
          </span>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        <button
          className={`flex items-center bg-custom-gradient cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white`}
        >
          <span>Edit Department</span>
        </button>
      </div>
    </form>
  );
}
