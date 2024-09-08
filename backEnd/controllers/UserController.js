const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Gerar o token de usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrar usuário e logar
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check se usuário existe
  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).json({ error: ["Por favor utilize outro e-mail."] });
  }

  // Generate password hash - TRANSFORMA A SENHA EM UM HASH (SEGURANÇA)
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    return res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
  }

  res.status(201).json({
    _id: newUser.id,
    token: generateToken(newUser.id),
  });
};

const login = (req, res) => {
  res.send("Login");
};

module.exports = {
  register,
  login,
};
