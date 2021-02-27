import config from "config";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied. No token given.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    console.log("decoded", decoded);
    next();
  } catch (error) {
    return res.status(400).send("Invalid token. Login Again!");
  }
};

export default auth;
