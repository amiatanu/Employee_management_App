const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  Location: { type: String, required: true },
  Password: { type: String, required: true },
  Role: {
    type: String,
    enum: ["Employee", "Manager"],
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

module.exports = mongoose.model("User", userSchema);
