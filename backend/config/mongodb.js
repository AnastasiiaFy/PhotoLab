import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected');
    } catch (err) {
        console.error('Помилка підключення до БД:', err);
        process.exit(1);
    }
}

export default connectDB;