const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB(); // Assuming this handles MongoDB connection

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/tasks", require("./routes/TaskRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
