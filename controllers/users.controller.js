const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mysqlConnection = require("../database");
const jwt = require("jsonwebtoken");
const { CreateUser } = require("../schemas/UserValidationSchema");

const createUser = async (req, res) => {
  try {
    const { email, password } = await CreateUser.validateAsync(req.body);
    const passHashed = await bcrypt.hash(password, 10);
    console.log(passHashed);
    const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;
    const newUserValues = [email, passHashed];
    mysqlConnection.connection.query(insertQuery, newUserValues, (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Error signing up' });
      }
      res.status(201).json({ message: 'Signup successful' });
    });
  } catch (error) { 
    console.log(error);
    let message = error instanceof Error ? error.message : error;
    return res.status(500).json({ message: message });
  }
};

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const getQuery = `SELECT * FROM users WHERE email = ?`;
    const userValues = [username];
    
    mysqlConnection.connection.query(getQuery, userValues, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error finding user' });
      }
      if (result.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Error comparing passwords' });
        }
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      });
    });
}


const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: ['id', 'email']
    });
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
    const { email } = req.body;
    const user = await User.findOne(id);
    if (user) {
      await user.update({
        email
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

const getUserProfile = async (req, res) => {
  console.log(" User ====>", req.user)
  const user = await User.findByPk(req.user.id);
  return res.status(200).json({ message: "User profile found", user });
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
