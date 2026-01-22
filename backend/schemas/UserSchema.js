const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  stream: {
    type: String,
    required: function() {
      return this.role === "user";
    }
  },
  year: {
    type: Number,
    required: function() {
      return this.role === "user";
    }
  },
  role: {
    type: String,
    enum: ["admin", "librarian", "user"],
    default: "user"   // ✅ NOT required
  }
});

module.exports = mongoose.model("User", UserSchema);
