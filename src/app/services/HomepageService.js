import Video from '../models/Video.js';
import blog from '../models/Blog.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class HomepageService {
    async index(req, res) {
        try {
            const isLogin = req.isAuthenticated();
            const videos = await Video.find({});
            const blogsData = await blog.find({});
            const blogs = multipleMongooesToOject(blogsData);

            const bmiTypeArray = [
                'Underweight',
                'Healthy',
                'Overweight',
                'Obese',
            ];
            let containsTheFirstFourVideos = [];

            for (let type of bmiTypeArray) {
                const videosOfType = await Video.find({ BMItype: type }).limit(
                    1,
                );
                containsTheFirstFourVideos.push(videosOfType[0].toObject());
            }

            res.render('homepage', {
                containsTheFirstFourVideos,
                blogs,
                isLogin,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    aboutUs(req, res){
        const isLogin = req.isAuthenticated();
        res.render('aboutUs',{isLogin})
    }
}

export default new HomepageService();
