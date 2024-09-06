const User = require("../models/User");

// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Gerar o token de usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrar usuário e logar
const register = (req, res) => {
  res.send("Register");
};

module.exports = {
  register,
};
