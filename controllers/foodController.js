import Food from "../models/food.js";

 const getAll = async(req,res,next) => {
    try {
        const foods = await Food.find();
        res.status(200).json({success:true ,data: foods})
    }
    catch(err){
     next(err)
    }
}

export default {
    getAll
}