import mongoose from "mongoose";


const connectToMongoDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected to the database: ", connection.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }

}

export default connectToMongoDb