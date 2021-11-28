const { User } = require("../models/users");
const { generateToken } = require("../help-auth/auth");

const login = async (req, res) => {
  const { fullname, email } = req.body;
  let payload, accessToken, isUser;
  try {
    // Check if any user exit all
    let userInDb = await User.find();
    if (userInDb.length === 0) {
      isUser = new User({
        fullname,
        email,
        role: "admin",
      });
      payload = {
        isUser,
      };
      accessToken = await generateToken(payload);
      isUser.save();
      res.cookie("user", accessToken);
      return res.status(201).json({ accessToken, payload });
    }

    isUser = await User.findOne({ email });
    if (!isUser) {
      return res
        .status(404)
        .json({ error: "User not found or not authorized to access this" });
    }
    payload = {
      isUser,
    };
    accessToken = await generateToken(payload);
    res.cookie("user", accessToken);
    return res.status(200).json({ accessToken, payload });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
