const express = require("express");
const {
  getEmployeeDetails,
  sortEmployee,
} = require("../controller/employeeController.js");
const {
  authenticateJWT,
  authorizeManager,
} = require("../middleware/middleware");

const { editDepartment } = require("../controller/departmentController.js");
const router = express.Router();

router.get(
  "/show-all-employees",
  authenticateJWT,
  authorizeManager,
  getEmployeeDetails
);

router.post("/edit-employee", editDepartment);

router.post("/sort-employee", sortEmployee);

module.exports = router;
