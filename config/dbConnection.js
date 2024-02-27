import mongoose from "mongoose";

mongoose.set('strictQuery',false);

const connectionToDB = () => {
    mongoose.connect(
        process.env.MONGO_URI || `mongodb://127.0.0.1:27017/lms`
    )
}