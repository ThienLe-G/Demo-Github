import User, { BMR, ActivityStatus, BMIStatus } from '../models/User.js';
import Video from '../models/Video.js';
import Food from '../models/Food.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class UserService {

    async index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
            try {
                const user = await User.findOne({
                    email: req.user.email,
                }).lean();
                if (user.status === 'Active') {
                    let bmi = user.BMIchange[user.BMIchange.length - 1]?.value || 0;
                    let bmiType;
                    if (bmi < 18.5) {
                        bmiType = BMIStatus.UNDERWEIGHT;
                    } else if (bmi >= 18.5 && bmi < 25) {
                        bmiType = BMIStatus.HEALTHY;
                    } else if (bmi >= 25 && bmi < 30) {
                        bmiType = BMIStatus.OVERWEIGHT;
                    } else {
                        bmiType = BMIStatus.OBESE;
                    }

                    const videos = await Video.find({ BMItype: bmiType }).lean();
                    let arr = categorizeVideosByRep(videos);
                    const shortVideos = arr[0];
                    const mediumVideos = arr[1];
                    const longVideos = arr[2];

                    const shortVideosJson = JSON.stringify(shortVideos);
                    const longVideosJson = JSON.stringify(longVideos);
                    const mediumVideosJson = JSON.stringify(mediumVideos);

                    const firstShortVideo =
                        shortVideos.length > 0 ? shortVideos[0] : null;
                    const firstMediumVideo =
                        mediumVideos.length > 0 ? mediumVideos[0] : null;
                    const firstLongVideo =
                        longVideos.length > 0 ? longVideos[0] : null;

                    const idFoods = user.choseFoode.map((food) => food.idFood);
                    const foods = await Food.find({ _id: { $in: idFoods } }).lean();
                    for (let i = 0; i < foods.length; i++) {
                        foods[i].grams = user.choseFoode[i].grams || 0;
                        foods[i].totalCalories =
                            (foods[i].calo * foods[i].grams) / 100;
                    }
                    const totalCalories = foods.reduce((total, food) => {
                        return total + food.calo;
                    }, 0);
                    res.render('user', {
                        totalCalories: totalCalories.toFixed(2),
                        foods,
                        user,
                        ActivityStatus,
                        isLogin,
                        firstShortVideo,
                        firstLongVideo,
                        firstMediumVideo,
                        shortVideosJson,
                        longVideosJson,
                        mediumVideosJson,
                    });
                } else {
                    res.send("Tài khoản của bạn đã bị khoá");
                }
            } catch (err) {
                console.log(err);
                res.send(err);
            }
        } else {
            res.render('user', {
                isLogin,
                user: null,
                food: null,
            });
        }
    }

    getUser = async (payload) => {
        try {
            const user = await User.findOne({ email: payload });
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    getUser = async (payload) => {
        try {
            const user = await User.findOne({ email: payload });
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    getUserById(req, res) {
        let id = req.query.id;
        User.findOne({ _id: id })
            .lean()
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    }

    getUserByEmail(req, res) {
        let email = req.user.email;
        User.findOne({ email })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }

    createUser = async (payload) => {
        try {
            const user = payload;
            user.photoUrl =
                'https://media.istockphoto.com/id/1209654046/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%E1%BB%93-s%C6%A1-avatar-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-minh-h%E1%BB%8Da-vector-%C4%91en.jpg?s=612x612&w=0&k=20&c=WzylxcP0LLDMfNHs_fSlwoAW8u9tVZNyC704xuV0GZE=';
            const newUser = await User.create(payload);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    };

    updateUser(req, res) {
        const updateData = {
            ...(req.file?.path && { photoUrl: req.file.path }),
            ...req.body,
        };

        let requiredCaloriesAmount = 0;
        if (updateData.sex == 'Male') {
            updateData.requiredCaloriesAmount =
                (10 * updateData.weight +
                    6.25 * updateData.height -
                    5 * updateData.age +
                    5) *
                BMR[updateData.pal];

        } else {
            updateData.requiredCaloriesAmount =
                (10 * updateData.weight +
                    6.25 * updateData.height -
                    5 * updateData.age -
                    161) *
                BMR[updateData.pal];
        }

        const bmi = (
            updateData.weight /
            (updateData.height / 100) ** 2
        ).toFixed(2);
        const currentDate = new Date();
        const cDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`;

        User.findOne({ email: req.user.email })
            .lean()
            .then((user) => {
                const latestDate =
                    user.BMIchange[user.BMIchange.length - 1]?.date || null;
                if (latestDate != null && latestDate === cDate) {
                    User.findOneAndUpdate(
                        {
                            email: req.user.email,
                            'BMIchange.date': cDate,
                        },
                        {
                            $set: {
                                'BMIchange.$.value': parseFloat(bmi),
                            },
                            ...updateData,
                        },
                        {
                            new: true,
                        },
                    )
                        .then((updateUser) => res.json(updateUser))
                        .catch((err) => {
                            res.status(500).json({
                                error: 'Internal Server Error',
                            });
                        });
                } else {
                    User.findOneAndUpdate(
                        {
                            email: req.user.email,
                        },
                        {
                            ...updateData,
                            $push: {
                                BMIchange: [
                                    { date: cDate, value: parseFloat(bmi) },
                                ],
                            },
                        },
                        {
                            new: true,
                        },
                    )
                        .then((updateUser) => res.json(updateUser))
                        .catch((err) => {
                            res.status(500).json({
                                error: 'Internal Server Error',
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    removeFood(req, res) {
        const idFood = req.params.idFood;
        const email = req.user.email;
        User.findOneAndUpdate(
            { email: email },
            { $pull: { choseFoode: idFood } },
            { new: true },
        )
            .then((user) => {
                res.redirect('/user');
            })
            .catch((error) => {
                res.json(error);
            });
    }
}

function categorizeVideosByRep(videos) {
    const repRanges = {
        short: 10,
        long: 15,
    };

    const shortVideos = [];
    const mediumVideos = [];
    const longVideos = [];

    videos.forEach((video) => {
        const rep = video.rep;

        if (rep <= repRanges.short) {
            shortVideos.push(video);
        } else if (rep > repRanges.short && rep < repRanges.long) {
            mediumVideos.push(video);
        } else {
            longVideos.push(video);
        }
    });

    return [shortVideos, mediumVideos, longVideos];
}


export default new UserService();
