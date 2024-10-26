// import VideoService from '../services/VideoService.js';

// class VideoCarouselController {
//     index(req, res) {
//         res.render('videoCarousel');
//     }
//     show(req, res) {
//         VideoService.show(req, res);
//     }
// }

// export default new VideoCarouselController();

import VideoCarouselService from '../services/VideoCarouselService.js';

class VideoCarouselController {
    index(req, res) {
        VideoCarouselService.index(req, res);
    }
}

export default new VideoCarouselController();
