import connectToDb from './db.js';
import mongoose from 'mongoose';
import Food from '../models/food.js';
import User from '../models/user.js';
import bcrypt from "bcrypt"

const hashPassword = async (plainTxtPassword) => {
  const hashedPassword = await bcrypt.hash(plainTxtPassword, 10);
  return hashedPassword
}

const seedingData = {
  foods: [
    {
      imageUrl: "https://www.allrecipes.com/thmb/yZXg4JBuCszkSx2y1og-pvjt0Pk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Are-Potatoes-Vegetables-3x2-1-e1743111587b4ff799c84944070945fe.png",
      name: 'Potatoz',
      origin: 'America',
      description: '1800 first made',
      review: []
    },
  ],
  users: [
    {
      email: "admin@gmail.com",
      userName: "Administrator", 
      password: await hashPassword("adminPassword"),
      role:"admin",
    },
    {
      email:"user@gmail.com",
      userName: "User",
      password: await hashPassword("userPassword"),
      role:"user",

    }
  ]
};

const seedDb = async () => {
  await connectToDb();
  await mongoose.connection.db.dropDatabase();
  console.log('Database connected!');
  await Food.create(seedingData.foods);
  await User.create(seedingData.users)
  console.log(`Succesfully created ${seedingData.users}`);
  console.log(`Succesfully created ${seedingData.foods}`);
  await mongoose.disconnect();
};
seedDb();
