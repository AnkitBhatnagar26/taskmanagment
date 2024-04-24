const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("################################", process.env.JWT_SECRET);
    // Extract the actual token (remove "Bearer " prefix)
    // Check if token format includes "jwt"
    if (token.includes("jwt")) {
      // Extract the token from "jwt" format
      token = token.split("jwt ")[1];
    }
    console.log("🚀 ~ file: auth.js ~ line 6 ~ token", token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decode);
    req.user = decode;
    console.log(req.user);
    req.query.userid = req.user._id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ code: 401, msg: "Authorization failed. Please login again." });
  }
};
