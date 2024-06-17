const {
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  getTotalEmployees,
} = require("../controllers/employees.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllEmployees);
router.get("/total",getTotalEmployees)
router.post("/new", createEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployeeById);
router.get("/:id", getEmployeeById);

module.exports = router;