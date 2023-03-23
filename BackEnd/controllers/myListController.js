import User from "../models/user.js";
import Food from "../models/food.js";

const addFood = async (req, res, next) => {
  const { foodId } = req.params;
  const userId = req.currentUser.id;

  try {
    // if (userId != req.currentUser.id) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "You have to be logged in to add something to your list",
    //   });
    // }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (userId != req.currentUser.id) {
      return res.status(404).json({
        success: false,
        message: "You have to be logged in to add something to your list",
      });
    }
    const food = await Food.findById(foodId);
    console.log(food);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    if (user.list.some((foodObj) => foodObj._id.toString() === foodId)) {
      return res
        .status(404)
        .json({ success: false, message: "Food already added" });
    }

    user.list.push(food);
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const grabList = async (req, res, next) => {
  const userId = req.currentUser.id;
  const user = await User.findById(userId);
  try {
    if (userId != req.currentUser.id) {
      return res.status(404).json({
        success: false,
        message: "You have to be logged in to get your list",
      });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const userList = user.list;
    res.status(200).json({ success: true, users: userList });
  } catch (err) {
    next(err);
  }
};

export default {
  addFood,
  grabList,
};
