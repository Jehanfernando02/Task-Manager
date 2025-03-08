const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ No need for extra options

    console.log("✅ MongoDB Connected Successfully");
} catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
}
};

// Export it
module.exports = connectDB;
