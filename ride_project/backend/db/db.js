const mongoose=require('mongoose')

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log("Connected to Database");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Exit process if connection fails
    }
};
module.exports=connectToDb