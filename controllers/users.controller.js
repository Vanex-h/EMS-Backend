const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mysqlConnection = require("../database");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  try {
    const { Names, Email, Telephone, Password } = req.body;
    const passHashed = await bcrypt.hash(Password, 10);
    console.log(passHashed);
    const insertQuery = `INSERT INTO users (Names, Email, Telephone, Password) VALUES (?, ?, ?, ?)`;
    const newUserValues = [Names, Email, Telephone, passHashed];
    await mysqlConnection.connection.query(insertQuery, newUserValues);
    return res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params;
    const user = await User.findOne(id);
    console.log(user);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "That User doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params;
    const { Names, Email, Telephone } = req.body;
    const user = await User.findOne(id);
    if (user) {
      await user.update({
        Names,
        Email,
        Telephone,
      });
      return res.json({ message: "User updated successfully", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params;
    const user = await User.findOne(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "Successfully deleted the User" });
    } else {
      return res.status(404).json({ message: "That User doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user.ID,
        Names: user.Names,
        Email: user.Email,
        Telephone: user.Telephone,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (res, req) => {
  const id = req.body.id;
  const User = await User.findOne(id);
  return res.status(200).json({ message: "User profile found", User });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  userLogin,
  getUserProfile,
};
