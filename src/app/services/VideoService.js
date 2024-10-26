import Video from '../models/Video.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class VideoService {
    index(req, res) {
        Video.find({})
            .then((videos) => {
                let isLogin = false;
                if (req.isAuthenticated()) {
                    isLogin = true;
                }
                const Arm1 = [];
                const Abs1 = [];
                const Chest1 = [];
                const Legs1 = [];
                const Shouder1 = [];
                const Arm2 = [];
                const Abs2 = [];
                const Chest2 = [];
                const Legs2 = [];
                const Shouder2 = [];

                videos = multipleMongooesToOject(videos);
                let level_1 = videos.filter(
                    (video) => video.level == 'beginner',
                );

                let armsLevel_1 = level_1.filter(
                    (video) => video.category == 'arms',
                );
                armsLevel_1.forEach((video) => {
                    Arm1.push(video);
                });
                const arms1 = JSON.stringify(Arm1);

                let absLevel_1 = level_1.filter(
                    (video) => video.category == 'abs',
                );
                absLevel_1.forEach((video) => {
                    Abs1.push(video);
                });
                const abs1 = JSON.stringify(Abs1);

                let shoulderLevel_1 = level_1.filter(
                    (video) => video.category == 'shoulder',
                );
                shoulderLevel_1.forEach((video) => {
                    Shouder1.push(video);
                });
                const shoulder1 = JSON.stringify(Shouder1);

                let chestLevel_1 = level_1.filter(
                    (video) => video.category == 'chest',
                );
                chestLevel_1.forEach((video) => {
                    Chest1.push(video);
                });
                const chest1 = JSON.stringify(Chest1);

                let legsLevel_1 = level_1.filter(
                    (video) => video.category == 'legs',
                );
                legsLevel_1.forEach((video) => {
                    Legs1.push(video);
                });
                const legs1 = JSON.stringify(Legs1);

                let level_2 = videos.filter((video) => video.level == 'medium');
                let armsLevel_2 = level_2.filter(
                    (video) => video.category == 'arms',
                );
                armsLevel_2.forEach((video) => {
                    Arm2.push(video);
                });
                const arms2 = JSON.stringify(Arm2);

                let absLevel_2 = level_2.filter(
                    (video) => video.category == 'abs',
                );
                absLevel_2.forEach((video) => {
                    Abs2.push(video);
                });
                const abs2 = JSON.stringify(Abs2);

                let shoulderLevel_2 = level_2.filter(
                    (video) => video.category == 'shoulder',
                );
                shoulderLevel_2.forEach((video) => {
                    Shouder2.push(video);
                });
                const shoulder2 = JSON.stringify(Shouder2);

                let chestLevel_2 = level_2.filter(
                    (video) => video.category == 'chest',
                );
                chestLevel_2.forEach((video) => {
                    Chest2.push(video);
                });
                const chest2 = JSON.stringify(Chest2);

                let legsLevel_2 = level_2.filter(
                    (video) => video.category == 'legs',
                );
                legsLevel_2.forEach((video) => {
                    Legs2.push(video);
                });
                const legs2 = JSON.stringify(Legs2);

                res.render('video', {
                    armsLevel_1,
                    absLevel_1,
                    shoulderLevel_1,
                    chestLevel_1,
                    legsLevel_1,
                    armsLevel_2,
                    absLevel_2,
                    shoulderLevel_2,
                    chestLevel_2,
                    legsLevel_2,
                    isLogin,
                    arms1,
                    arms2,
                    abs1,
                    abs2,
                    chest1,
                    chest2,
                    legs1,
                    legs2,
                    shoulder1,
                    shoulder2,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    show(req, res) {
        Video.findOne({ videoId: req.params.id })
            .then((video) => {
                let isLogin = false;
                if (req.isAuthenticated()) {
                    isLogin = true;
                }
                res.render('./videos/show', {
                    video: mongooesToOject(video),
                    isLogin,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    viewcoach_BMI_type(req, res) {
        let type = req.params.BMItype;
        Video.find({ BMItype: type })
            .then((videos) => {
                let isLogin = false;
                if (req.isAuthenticated()) {
                    isLogin = true;
                }
                let videosReturn = multipleMongooesToOject(videos);
                let videoArrayJSON = JSON.stringify(videos);
                res.render('viewcoach', {
                    videoArrayJSON,
                    videosReturn,
                    isLogin,
                    type,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    viewcoach_body_parts(req, res) {
        const videoArrayJSON = req.body.array;
        const type = req.query.type;
        const videosReturn = JSON.parse(videoArrayJSON);
        res.render('viewcoach', { videosReturn, type, videoArrayJSON });
    }

    viewcoach_Video_durations(req, res) {
        const videoArrayJSON = req.body.array;
        const type = req.params.Videoduration;
        const videosReturn = JSON.parse(videoArrayJSON);
        res.render('viewcoach', { videosReturn, type, videoArrayJSON });
    }
}

export default new VideoService();
