// import User from '../models/user.js';

// const addFood = async (req, res, next) => {
//   const { foodId } = req.body;
//   const { userId } = req.currentUser; // assuming you have implemented authentication and have the user's id in the request object
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     if (user.list.includes(foodId)) {
//       return res.status(400).json({ message: 'Food already in the list' });
//     }
//     user.list.push(foodId);
//     await user.save();
//     res.status(200).json({ message: 'Food added to the list' });
//   } catch (error) {
//     next(error);
//   }
// };

// export default {
//   addFood,
// };
