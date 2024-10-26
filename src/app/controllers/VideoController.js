import VideoService from '../services/VideoService.js';

class VideoController {
    index(req, res) {
        VideoService.index(req, res);
    }
    show(req, res) {
        VideoService.show(req, res);
    }
    viewcoach(req, res) {
        VideoService.viewcoach_BMI_type(req, res);
    }
    viewcoach_body_parts(req, res) {
        VideoService.viewcoach_body_parts(req, res);
    }
    viewcoach_Video_durations(req, res) {
        VideoService.viewcoach_Video_durations(req, res);
    }
}

export default new VideoController();
