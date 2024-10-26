import Video from '../models/Video.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class VideoCarouselService {
    index(req, res) {
        const videosJSON = req.body.array;
        const videos = JSON.parse(videosJSON);
        res.render('videoCarousel', { videos });
    }
}
export default new VideoCarouselService();
