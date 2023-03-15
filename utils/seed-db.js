import connectToDb from './db.js';
import mongoose from 'mongoose';
import Food from '../models/food.js';

const seedingData = {
  foods: [
    {
      name: 'Potato',
      origin: 'America',
      description: '1800 first made',
      review: [],
    },
  ],
};

const seedDb = async () => {
  await connectToDb();
  await mongoose.connection.db.dropDatabase();
  console.log('Database connected!');
  await Food.create(seedingData.foods);
  console.log(`Succesfully created ${seedingData.foods}`);
  await mongoose.disconnect();
};
seedDb();
