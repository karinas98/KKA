// import Food from '../models/food.js';
// import User from '../models/user.js';

// const addToList = async (req, res, next) => {
//     const userId = req.currentUser._id;
//     const foodId = req.params.id;
//     try {
//       // Check if the food exists
//       const food = await Food.findById(foodId);
//       if (!food) {
//         return res.status(404).json({ success: false, message: 'Food not found' });
//       }
//       // Add the food id to the user's list
//       const user = await User.findByIdAndUpdate(userId, { $addToSet: { list: foodId } }, { new: true });
//       res.status(200).json({ success: true, data: user.list });
//     } catch (err) {
//       next(err);
//     }
// }

// export default {
//     addToList
// }