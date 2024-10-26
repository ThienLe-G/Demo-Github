import mongoose, { model } from 'mongoose';

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
        console.log('connect database successfully!');
    } catch (error) {
        console.log('connect database failure!', error);
    }
}

export { connect };
