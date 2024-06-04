const {
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/employees.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllEmployees);
router.post("/new", createEmployee);
router.put("/:id/update", updateEmployee);
router.delete("/:id/delete", deleteEmployeeById);
router.get("/:id", getEmployeeById);

module.exports = router;