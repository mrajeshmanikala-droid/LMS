const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const users = require("./routes/user.js");
const books = require("./routes/books.js");
const admin = require("./routes/admin.js");
const librarian = require("./routes/librarian.js");
const home = require("./routes/home.js");

const app = express();

// ✅ Middlewares
app.use(express.json());

// ✅ Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  method: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Routes
app.use("/users", users);
app.use("/api/books", books);
app.use("/admin", admin);
app.use("/librarian", librarian);
app.use("/home", home);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ MongoDB FIRST, server AFTER
const PORT = process.env.PORT || 5001;
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
