import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        title: { type: String },
        content: { type: String },
        image: { type: String },
        slug: { type: String },
        author: { type: String },
        likedList: { type: [] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Blog', Blog);
