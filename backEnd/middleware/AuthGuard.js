const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: ["Acesso negado"] });

  try {
    const verified = jwt.verify(token, jwtSecret);

    // Verifica e tira a senha do retorno
    req.user = await User.findById(verified._id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ error: ["Token inválido"] });
  }
};

module.exports = authGuard;
