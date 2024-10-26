import express from 'express';
import VideoController from '../app/controllers/VideoController.js';

const router = express.Router();

router.get('/', VideoController.index);
router.get('/:id', VideoController.show);
router.get('/viewcoach/:BMItype', VideoController.viewcoach);
router.post('/viewcoach', VideoController.viewcoach_body_parts);
router.post(
    '/viewcoach/:Videoduration',
    VideoController.viewcoach_Video_durations,
);

export default router;
