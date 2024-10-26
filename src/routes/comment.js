import express from 'express';
import CommentController from '../app/controllers/CommentController.js';
import fileUploader from '../middlerwares/cloudinary.js';

const router = express.Router();

router.get('/getBlogComments', CommentController.getBlogComments);

router.get('/getReplyComments', CommentController.getReplyComments);

router.post(
    '/',
    fileUploader.single('imgUrl'),
    CommentController.createComment,
);

router.patch('/addLike', CommentController.addLike);

router.patch('/removeLike', CommentController.removeLike);

export default router;
