const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticket");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {

    res.json({

        message: "IT Help Desk API Running 🚀"

    });

});

// Ticket Routes
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});