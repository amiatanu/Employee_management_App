const departments = require("../models/departments.js");
const User = require("../models/user.js");

const getAllDepartments = async (req, res) => {
  try {
    const departmentsWithCounts = await departments
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "department",
            as: "employees",
          },
        },
        {
          $project: {
            name: 1,
            employeeCount: { $size: "$employees" },
          },
        },
      ])
      .exec();

    return res
      .status(200)
      .json({ success: true, departments: departmentsWithCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching unique departments" });
  }
};

const departmentInfo = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await departments.findById(departmentId);
    if (!department) {
      return res
        .status(401)
        .json({ success: false, message: "No such department exist" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const department = await departments.findOne({ name: name });
    if (department == "name") {
      return res
        .status(401)
        .json({ success: false, message: "Department already exist" });
    }

    const newDepartment = new departments({ name });
    await newDepartment.save();

    return res
      .status(200)
      .json({ success: true, message: "Department created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

const editDepartment = async (req, res) => {
  const { _id, department } = req.body;

  // Find the department by name
  const departmentData = await departments.findOne({ name: department });

  if (!departmentData) {
    return res
      .status(404)
      .json({ success: false, message: "Department not found" });
  }

  // Find the user by _id
  const userData = await User.findById(_id);

  if (!userData) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Update the user's department with the department ObjectId
  userData.department = departmentData._id;

  console.log(userData);

  // Save the updated user data
  await userData.save();

  return res
    .status(200)
    .json({ success: true, message: "Department updated successfully" });
};

const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await departments.findById(departmentId);

    if (!department) {
      return res
        .status(401)
        .json({ success: false, message: "No such department exist" });
    }

    await department.delete();

    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding departments" });
  }
};

const sortEmployee = async (req, res) => {};
module.exports = {
  getAllDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
  departmentInfo,
};
