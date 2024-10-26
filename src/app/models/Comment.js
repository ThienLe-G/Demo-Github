import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        blogId: { type: String },
        content: { type: String },
        imgUrl: { type: String },
        userId: { type: String },
        likedList: { type: [] },
        parentId: { type: String },
        responseTimes: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Comment', Comment);
