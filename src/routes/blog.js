import express from 'express';
import BlogController from '../app/controllers/BlogController.js';

const router = express.Router();

router.get('/showPanigation', BlogController.showPanigation);

router.get('/', BlogController.index);

router.post('/create', BlogController.createBlog);

router.get('/blogDetail/:slug', BlogController.showDetail);

router.patch('/addLike', BlogController.addLike);

router.patch('/removeLike', BlogController.removeLike);

export default router;
