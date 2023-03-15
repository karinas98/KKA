import mongoose from "mongoose"
const foodSchema=mongoose.Schema ( 
   {
    name: {type:String, required:true},
    origin: {type:String, required:true},
    description:{type:String, required:true},
    review:[]
   },
   {
    timestamps:true
   }
)

// export const FoodModel=mongoose.model("Food", foodSchema)
export default mongoose.model("Food", foodSchema);