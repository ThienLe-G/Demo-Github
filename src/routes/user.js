import express from 'express';
import userController from '../app/controllers/UserController.js';
import fileUploader from '../middlerwares/cloudinary.js';

const router = express.Router();

router.get('/', userController.index);
router.get('/getUserByEmail', userController.getUserByEmail);
router.get('/getById', userController.getById);
router.post('/', fileUploader.single('photoUrl'), userController.updateUser);
router.post('/:idFood', userController.removeFood);

export default router;
