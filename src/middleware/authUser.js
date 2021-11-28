const { verifyToken } = require("../help-auth/auth");

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("No token");
    }
    const decoded = await verifyToken(token);
    if (decoded.isUser.role === "admin") {
      next();
      return
    }
    throw new Error("You are not authorized to view this");
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: err,
    });
  }
};

module.exports = { authUser };
