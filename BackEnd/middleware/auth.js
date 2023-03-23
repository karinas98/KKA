import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts.js";
import User from "../models/user.js";

export const auth = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  const token = rawToken.replace("Bearer ", "");

  if (!rawToken) {
    return res.status(403).son({ message: "No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const foundUser = await User.findById(decodedToken.id).select(
      "email userName id role"
    );
    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "User with this id does not exist in our database" });
    }
    req.currentUser = foundUser;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
