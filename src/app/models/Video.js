import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Video = new Schema(
    {
        title: { type: String },
        caloriesAmount: { type: Number },
        videoId: { type: String },
        image: { type: String },
        level: { type: String },
        sex: { type: String },
        category: { type: String },
        BMItype: { type: String },
        duration: { type: Number },
        rep: { type: Number },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Video', Video);
