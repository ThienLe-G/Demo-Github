import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ActivityStatus = {
    SEDENTARY: 'Sedentary',
    LIGHTLY_ACTIVE: 'Lightly Active',
    MODERATELY_ACTIVE: 'Moderately Active',
    VERY_ACTIVE: 'Very Active',
    EXTREMELY_ACTIVE: 'Extremely Active',
};

export const BMR = {
    [ActivityStatus.SEDENTARY]: 1.2,
    [ActivityStatus.LIGHTLY_ACTIVE]: 1.375,
    [ActivityStatus.MODERATELY_ACTIVE]: 1.55,
    [ActivityStatus.VERY_ACTIVE]: 1.725,
    [ActivityStatus.EXTREMELY_ACTIVE]: 1.9,
};

export const BMIStatus = {
    UNDERWEIGHT: 'Underweight',
    HEALTHY: 'Healthy',
    OVERWEIGHT: 'Overweight',
    OBESE: 'Obese',
};

const User = new Schema(
    {
        name: { type: String },
        email: { type: String },
        age: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        weight: {
            type: Number,
            default: 0,
        },
        sex: { type: String },
        pal: {
            type: String,
            enum: Object.values(ActivityStatus),
            default: ActivityStatus.SEDENTARY,
        },
        userCaloriesAmount: {
            type: Number,
            default: 0,
        },
        requiredCaloriesAmount: {
            type: Number,
            default: 0,
        },
        foodLike: [
            { type: String }
        ],
        BMIchange: [
            {
                date: { type: String },
                value: { type: Number },
            },
        ],
        choseFoode: [
            {
                idFood: { type: String },
                grams: { type: Number },
            },
        ],
        photoUrl: { type: String },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', User);
