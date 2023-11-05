const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  const tokenParts = token.split(" ");
  if (!token) {
    return res.sendStatus(401);
  }

  if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
    jwt.verify(tokenParts[1], process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = await User.findById(user?.userId);
      next();
    });
  }
};

const authorizeManager = (req, res, next) => {
  try {
    const user = req.user;

    if (user?.Role !== "Manager") {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: message.error });
  }
};

module.exports = { authenticateJWT, authorizeManager };
