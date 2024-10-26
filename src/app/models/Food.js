import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Food = new Schema(
    {
        name: { type: String },
        img: { type: String },
        description: { type: String },
        category: { type: String },
        calo: { type: Number },
        isDisable: { type: String },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Food', Food);
