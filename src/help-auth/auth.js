const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const generateToken = async (payload, secret = secretKey) => {
  try {
    const token = await jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (token, secret = secretKey) => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
