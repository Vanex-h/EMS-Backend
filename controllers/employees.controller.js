const express = require("express");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const mysqlConnection = require("../database");
const jwt = require("jsonwebtoken");
const { CreateEmployee } = require("../schemas/EmployeeValidationSchema");

const createEmployee = async (req, res) => {
  try {
    const {firstName, lastName, national_id, telephone, email, department, position, laptop_manufacturer, model, serial_number} = await CreateEmployee.validateAsync(req.body);
    const insertQuery = `INSERT INTO employees (FirstName, LastName, National_id, Telephone, Email, Department, Position, Laptop_manufacturer, Model, Serial_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const newEmployeeValues = [firstName, lastName, national_id, telephone, email, department, position, laptop_manufacturer, model, serial_number];
    await mysqlConnection.connection.query(insertQuery, newEmployeeValues);
    return res.status(200).json({ message: "Employee added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const data = await Employee.findAll();
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const id = req.params;
    const employee = await Employee.findOne(id);
    console.log(employee);
    if (employee) {
      return res.json(employee);
    } else {
      return res.status(404).json({ message: "That employee doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params;
    const { FirstName, LastName, National_id, Telephone, Email, Department, Position, Laptop_manufacturer, Model, Serial_number } = req.body;
    const employee = await Employee.findOne(id);
    if (employee) {
      await employee.update({
        FirstName, LastName, National_id, Telephone, Email, Department, Position, Laptop_manufacturer, Model, Serial_number
      });
      return res.json({ message: "Employee updated successfully", Employee });
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const id = req.params;
    const employee = await Employee.findOne(id);
    if (employee) {
      await employee.destroy();
      res.status(200).json({ message: "Successfully deleted the Employee" });
    } else {
      return res.status(404).json({ message: "That Employee doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const EmployeeLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const Employee = await Employee.findOne({ where: { Email } });
    if (!Employee) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(Password, Employee.Password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: Employee.ID,
        Names: Employee.Names,
        Email: Employee.Email,
        Telephone: Employee.Telephone,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getEmployeeProfile = async (res, req) => {
  const id = req.body.id;
  const Employee = await Employee.findOne(id);
  return res.status(200).json({ message: "Employee profile found", Employee });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
  EmployeeLogin,
  getEmployeeProfile,
};
