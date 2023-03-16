import express from 'express';
import foodController from './controllers/foodController.js';
import userController from './controllers/userController.js';

const router = express.Router();
router.route('/foods').get(foodController.getAll).post(foodController.create);
router
  .route('/foods/:id')
  .get(foodController.getById)
  .patch(foodController.updateById)
  .delete(foodController.deleteById);

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);

export default router;
