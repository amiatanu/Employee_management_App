const express = require("express");
const {
  authenticateJWT,
  authorizeManager,
} = require("../middleware/middleware");
const {
  addDepartment,
  getAllDepartments,
  departmentInfo,
  editDepartment,
  deleteDepartment,
} = require("../controller/departmentController");

const router = express.Router();

router.post(
  "/create-department",
  authenticateJWT,
  authorizeManager,
  addDepartment
);

router.get(
  "/show-all-departments",
  authenticateJWT,
  authorizeManager,
  getAllDepartments
);

router.get(
  "/get-department-info/:departmentId",
  authenticateJWT,
  authorizeManager,
  departmentInfo
);

router.post(
  "/edit-department/:departmentId",
  authenticateJWT,
  authorizeManager,
  editDepartment
);

router.delete(
  "/delete-department/:departmentId",
  authenticateJWT,
  authorizeManager,
  deleteDepartment
);

module.exports = router;
