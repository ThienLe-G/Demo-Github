function multipleMongooesToOject(mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
}

function mongooesToOject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
}
export { multipleMongooesToOject, mongooesToOject };
