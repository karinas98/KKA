import User from "../models/user.js";
import bcrypt from "bcrypt"

const register = async (req, res, next) => {
 const newUser = req.body
 try {
    const userExist = await User.findOne({email: newUser.email})
    if (userExist) {
        return res.status(400).json({message:"User already exists",data: userExist})
    }
    if (newUser.password !== newUser.confirmPassword){
        return res.status(400).json({message: "Passwords do not match"})
    }
    //const createdUser = await User.create(newUser)
    //const payload = { id } 
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await User.create(newUser)
   return res.status(200).json({message: `User succesfully registered with ${newUser.password}`})
 }
catch (err){
    next(err)
}
};

const login = async (req, res, next) => {
  
  return res.status(200).json({me:"sssds"})
};

export default {
  register,
  login,
};
