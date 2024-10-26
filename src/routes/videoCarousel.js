import express from 'express';
import VideoCarouselController from '../app/controllers/VideoCarouselController.js';

const router = express.Router();

router.post('/', VideoCarouselController.index);

export default router;
