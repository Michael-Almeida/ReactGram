const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Gerar o token de usuário
const generateToken = (_id) => {
  return jwt.sign({ _id }, jwtSecret, {
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
      .json({ error: ["Houve um erro, por favor tente mais tarde"] });
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check if user exists
  if (!user) {
    return res.status(404).json({ error: ["Usuário não cadastrado"] });
  }

  // Check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(422).json({ error: ["Senha inválida"] });
  }
  res.status(201).json({
    _id: user._id,
    profileImage:user.profileImage,
    token: generateToken(user._id),
  });
  // return user with token
};

// Gett current logged in user
const getCurrentUser = async (req, res)=>{
  const user = req.user;

  res.status(200).json(user);
}

module.exports = {
  register,
  login,
  getCurrentUser
};
