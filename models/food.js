import mongoose from 'mongoose';

 const reviewSchema = mongoose.Schema({

    text:{ type:String, required:true },
    //stars:{type: Integer, required: true}
    createdBy:{type: mongoose.Schema.ObjectId, ref: "user"}
 },
 {timestamps: true}
 )

const foodSchema = mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    origin: { type: String, required: true },
    description: { type: String, required: true },
    review: [reviewSchema],
    // liking: {
    // type: Number,
    // min: 1,
    // max: 5,
    // default: 3
//   }
  },
  {
    timestamps: true,
  },

);


// export const FoodModel=mongoose.model("Food", foodSchema)
export default mongoose.model('Food', foodSchema);

