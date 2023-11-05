const user = require("../models/user");

const getEmployeeDetails = async (req, res) => {
  try {
    const employees = await user.find({}).populate("department", "name"); // Populate the 'department' field and select 'name' property.
    console.log("No of Employee:----" + employees.length);

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get data in sorting order and by Location/Name
const sortEmployee = async (req, res) => {
  try {
    const { sortingOption, sortOrder } = req.body;
    let sortField;
    let employees;

    if (sortingOption === "Location") {
      // Sort employees by Location
      sortField = "Location";
    } else if (sortingOption === "Name") {
      // Sort employees by Name
      sortField = "FirstName";
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sorting option" });
    }

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    employees = await user
      .find({})
      .populate("department", "name")
      .sort({ [sortField]: sortDirection });

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEmployeeDetails, sortEmployee };
