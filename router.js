import express from 'express';
import foodController from './controllers/foodController.js';
import userController from './controllers/userController.js';
import { auth } from './middleware/auth.js';


const router = express.Router();
router.route('/foods').get(foodController.getAll).post(foodController.create);
router
  .route('/foods/:id')
  .get(foodController.getById)
  .patch(auth,foodController.updateById)
  .delete(auth,foodController.deleteById);

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);

export default router;
