import express from 'express';
import foodController from './controllers/foodController.js';



const router = express.Router()
router.route("/foods").get(foodController.getAll)

export default router;