const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} = require("../controllers/users.controller");
const { userLogin } = require("../controllers/users.controller");
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUserById);
router.get("/Users", getAllUsers);
router.get("/User/:id", getUserById);

router.post("/auth/userLogin", userLogin);
// Path: controllers/employees.controller.js

const {
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/employees.controller");
router.post("/createEmployee", createEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployeeById);
router.get("/Employees", getAllEmployees);
router.get("/Employee/:id", getEmployeeById);
// router.post("/userLogin", userLogin);


module.exports = router;